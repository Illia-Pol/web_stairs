const { z } = require("zod");

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;
const TELEGRAM_TIMEOUT_MS = 7_000;

const LeadPayloadSchema = z.object({
  name: z.string().trim().max(80).optional().default(""),
  phone: z.string().trim().min(3, "PHONE_REQUIRED").max(40),
  city: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(2_000).optional().default(""),
  pageUrl: z.string().trim().max(500).optional().default(""),
  source: z.string().trim().max(120).optional().default("site_form"),
  honeypot: z.string().trim().max(200).optional().default("")
});

const globalState = globalThis;
if (!globalState.__stairsRateMap) {
  // Best-effort in-memory limiter: в serverless-окружении состояние не гарантируется между инстансами.
  globalState.__stairsRateMap = new Map();
}
const rateMap = globalState.__stairsRateMap;

function parseAllowedOrigins(raw) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function setCorsHeaders(req, res, allowedOrigins) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : "";
  const hasAllowlist = allowedOrigins.length > 0;
  const isOriginAllowed = !hasAllowlist || (origin && allowedOrigins.includes(origin));

  if (hasAllowlist) {
    if (origin && isOriginAllowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  return { hasAllowlist, isOriginAllowed, hasOrigin: Boolean(origin) };
}

function checkRateLimit(ip) {
  const now = Date.now();
  const current = rateMap.get(ip) ?? [];
  const fresh = current.filter((ts) => now - ts < RATE_WINDOW_MS);

  if (fresh.length >= RATE_LIMIT) {
    rateMap.set(ip, fresh);
    return false;
  }

  fresh.push(now);
  rateMap.set(ip, fresh);
  return true;
}

function extractIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress ?? "unknown";
}

function normalizeText(value) {
  if (!value) return "";
  return String(value).replace(/\r/g, "").trim();
}

function parseRequestBody(req) {
  const { body } = req;

  if (!body) return {};

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error("BAD_JSON");
    }
  }

  if (Buffer.isBuffer(body)) {
    try {
      return JSON.parse(body.toString("utf8"));
    } catch {
      throw new Error("BAD_JSON");
    }
  }

  if (typeof body === "object") return body;

  throw new Error("BAD_BODY");
}

function buildMessage(data) {
  return [
    "Новая заявка с сайта",
    `Имя: ${normalizeText(data.name) || "—"}`,
    `Телефон: ${normalizeText(data.phone) || "—"}`,
    `Город: ${normalizeText(data.city) || "—"}`,
    `Сообщение: ${normalizeText(data.message) || "—"}`,
    `Источник: ${normalizeText(data.source) || "site_form"}`,
    `Страница: ${normalizeText(data.pageUrl) || "—"}`
  ].join("\n");
}

async function sendTelegramMessage({ botToken, chatId, text }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      return { ok: false, error: "TELEGRAM_API_ERROR" };
    }

    let parsed = null;
    try {
      parsed = await response.json();
    } catch {
      return { ok: false, error: "TELEGRAM_BAD_RESPONSE" };
    }

    if (!parsed || parsed.ok !== true) {
      return { ok: false, error: "TELEGRAM_RESPONSE_NOT_OK" };
    }

    return { ok: true };
  } catch (error) {
    if (error && typeof error === "object" && error.name === "AbortError") {
      return { ok: false, error: "TELEGRAM_TIMEOUT" };
    }
    return { ok: false, error: "TELEGRAM_REQUEST_FAILED" };
  } finally {
    clearTimeout(timeoutId);
  }
}

module.exports = async function handler(req, res) {
  const allowedOrigins = parseAllowedOrigins(process.env.CORS_ALLOW_ORIGINS);
  const corsState = setCorsHeaders(req, res, allowedOrigins);

  if (req.method === "OPTIONS") {
    if (corsState.hasAllowlist && corsState.hasOrigin && !corsState.isOriginAllowed) {
      return res.status(403).json({ ok: false, error: "CORS_ORIGIN_NOT_ALLOWED" });
    }
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  if (corsState.hasAllowlist && corsState.hasOrigin && !corsState.isOriginAllowed) {
    return res.status(403).json({ ok: false, error: "CORS_ORIGIN_NOT_ALLOWED" });
  }

  const ip = extractIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "RATE_LIMIT" });
  }

  let parsedBody = {};
  try {
    parsedBody = parseRequestBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: "INVALID_JSON" });
  }

  const parsed = LeadPayloadSchema.safeParse(parsedBody);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_PAYLOAD" });
  }

  const payload = parsed.data;

  // Honeypot: возвращаем ok, но не отправляем в Telegram.
  if (payload.honeypot) {
    return res.status(200).json({ ok: true });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ ok: false, error: "TELEGRAM_ENV_MISSING" });
  }

  const telegramResult = await sendTelegramMessage({
    botToken,
    chatId,
    text: buildMessage(payload)
  });

  if (!telegramResult.ok) {
    return res.status(502).json({ ok: false, error: telegramResult.error });
  }

  return res.status(200).json({ ok: true });
};
