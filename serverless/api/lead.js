const fs = require("node:fs/promises");
const formidableModule = require("formidable");
const { z } = require("zod");

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;
const TELEGRAM_TIMEOUT_MS = 7_000;
const MAX_FILES = 8;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

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
    .map((item) => item.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

function isLocalDevOrigin(origin) {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  } catch {
    return false;
  }
}

function matchesAllowedOrigin(origin, allowedOrigins) {
  if (!origin) return false;
  const normalizedOrigin = origin.replace(/\/+$/, "");

  if (isLocalDevOrigin(normalizedOrigin)) {
    return true;
  }

  return allowedOrigins.some((allowed) => {
    if (allowed === "*") return true;
    if (allowed.endsWith(":*")) {
      const prefix = allowed.slice(0, -1);
      return normalizedOrigin.startsWith(prefix);
    }
    return normalizedOrigin === allowed;
  });
}

function setCorsHeaders(req, res, allowedOrigins) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : "";
  const hasAllowlist = allowedOrigins.length > 0;
  const isOriginAllowed = !hasAllowlist || matchesAllowedOrigin(origin, allowedOrigins);

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

function firstValue(value) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
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

async function parseMultipartForm(req) {
  const createFormidable = typeof formidableModule === "function"
    ? formidableModule
    : formidableModule.formidable;
  const form = createFormidable({
    multiples: true,
    maxFiles: MAX_FILES,
    maxFileSize: MAX_FILE_SIZE_BYTES,
    allowEmptyFiles: false
  });

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (error, parsedFields, parsedFiles) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ fields: parsedFields, files: parsedFiles });
    });
  });

  const normalizedFields = {
    name: String(firstValue(fields.name || "")).trim(),
    phone: String(firstValue(fields.phone || "")).trim(),
    city: String(firstValue(fields.city || "")).trim(),
    message: String(firstValue(fields.message || "")).trim(),
    pageUrl: String(firstValue(fields.pageUrl || "")).trim(),
    source: String(firstValue(fields.source || "")).trim(),
    honeypot: String(firstValue(fields.honeypot || "")).trim()
  };

  const rawFiles = files.files;
  const normalizedFiles = Array.isArray(rawFiles)
    ? rawFiles
    : rawFiles
      ? [rawFiles]
      : [];

  return {
    fields: normalizedFields,
    files: normalizedFiles
  };
}

function buildMessage(data) {
  return [
    "Новая заявка с сайта",
    `Имя: ${normalizeText(data.name) || "—"}`,
    `Телефон: ${normalizeText(data.phone) || "—"}`,
    `Город: ${normalizeText(data.city) || "—"}`,
    `Сообщение: ${normalizeText(data.message) || "—"}`
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

async function sendTelegramPhotos({ botToken, chatId, files }) {
  if (!Array.isArray(files) || files.length === 0) {
    return { ok: true };
  }

  if (files.length === 1) {
    const file = files[0];
    const filePath = file?.filepath;
    if (!filePath) {
      return { ok: true };
    }

    const content = await fs.readFile(filePath);
    const mimeType = file.mimetype || "application/octet-stream";
    const filename = file.originalFilename || "lead-photo-1.jpg";
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", new Blob([content], { type: mimeType }), filename);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: formData,
        signal: controller.signal
      });

      if (!response.ok) {
        return { ok: false, error: "TELEGRAM_PHOTO_API_ERROR" };
      }

      let parsed = null;
      try {
        parsed = await response.json();
      } catch {
        return { ok: false, error: "TELEGRAM_PHOTO_BAD_RESPONSE" };
      }

      if (!parsed || parsed.ok !== true) {
        return { ok: false, error: "TELEGRAM_PHOTO_NOT_OK" };
      }

      return { ok: true };
    } catch (error) {
      if (error && typeof error === "object" && error.name === "AbortError") {
        return { ok: false, error: "TELEGRAM_PHOTO_TIMEOUT" };
      }
      return { ok: false, error: "TELEGRAM_PHOTO_REQUEST_FAILED" };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  const media = [];
  const formData = new FormData();

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const filePath = file?.filepath;
    if (!filePath) {
      continue;
    }

    const content = await fs.readFile(filePath);
    const mimeType = file.mimetype || "application/octet-stream";
    const filename = file.originalFilename || `lead-photo-${index + 1}.jpg`;
    const attachKey = `file${index}`;

    formData.append(attachKey, new Blob([content], { type: mimeType }), filename);
    media.push({
      type: "photo",
      media: `attach://${attachKey}`
    });
  }

  if (media.length === 0) {
    return { ok: true };
  }

  formData.append("chat_id", chatId);
  formData.append("media", JSON.stringify(media));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMediaGroup`, {
      method: "POST",
      body: formData,
      signal: controller.signal
    });

    if (!response.ok) {
      return { ok: false, error: "TELEGRAM_MEDIA_API_ERROR" };
    }

    let parsed = null;
    try {
      parsed = await response.json();
    } catch {
      return { ok: false, error: "TELEGRAM_MEDIA_BAD_RESPONSE" };
    }

    if (!parsed || parsed.ok !== true) {
      return { ok: false, error: "TELEGRAM_MEDIA_NOT_OK" };
    }

    return { ok: true };
  } catch (error) {
    if (error && typeof error === "object" && error.name === "AbortError") {
      return { ok: false, error: "TELEGRAM_MEDIA_TIMEOUT" };
    }
    return { ok: false, error: "TELEGRAM_MEDIA_REQUEST_FAILED" };
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

  const contentType = String(req.headers["content-type"] || "");
  let parsedBody = {};
  let uploadedFiles = [];
  try {
    if (contentType.includes("multipart/form-data")) {
      const multipart = await parseMultipartForm(req);
      parsedBody = multipart.fields;
      uploadedFiles = multipart.files;
    } else {
      parsedBody = parseRequestBody(req);
    }
  } catch {
    return res.status(400).json({ ok: false, error: "INVALID_BODY" });
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

  const mediaResult = await sendTelegramPhotos({
    botToken,
    chatId,
    files: uploadedFiles
  });

  if (!mediaResult.ok) {
    return res.status(502).json({ ok: false, error: mediaResult.error });
  }

  return res.status(200).json({ ok: true });
};
