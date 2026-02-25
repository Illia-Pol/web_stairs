const { z } = require("zod");

const LeadPayloadSchema = z.object({
  name: z.string().trim().optional().default(""),
  phone: z.string().trim().min(3, "PHONE_REQUIRED"),
  city: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
  pageUrl: z.string().trim().optional().default(""),
  source: z.string().trim().optional().default("site_form"),
  honeypot: z.string().trim().optional().default("")
});

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;

// Best-effort in-memory limiter: в serverless окружении состояние не гарантируется между инстансами.
const globalState = globalThis;
if (!globalState.__stairsRateMap) {
  globalState.__stairsRateMap = new Map();
}
const rateMap = globalState.__stairsRateMap;

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

function buildMessage(data) {
  return [
    "Новая заявка с сайта",
    `Имя: ${data.name || "{{CLIENT_NAME}}"}`,
    `Телефон: ${data.phone}`,
    `Город: ${data.city || "{{CITY}}"}`,
    `Сообщение: ${data.message || "{{CLIENT_MESSAGE}}"}`,
    `Источник: ${data.source}`,
    `Страница: ${data.pageUrl || "{{PAGE_URL}}"}`
  ].join("\n");
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const ip = extractIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "RATE_LIMIT" });
  }

  const parsed = LeadPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_PAYLOAD" });
  }

  const payload = parsed.data;

  // Honeypot: молча возвращаем ok, не отправляя в Telegram.
  if (payload.honeypot) {
    return res.status(200).json({ ok: true });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ ok: false, error: "TELEGRAM_ENV_MISSING" });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(payload)
      })
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: "TELEGRAM_API_ERROR" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "TELEGRAM_REQUEST_FAILED" });
  }
};
