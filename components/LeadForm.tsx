"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type LeadFormProps = {
  source: string;
  className?: string;
  compact?: boolean;
  leadEndpoint: string;
  telegramFallback: {
    username: string;
    url: string;
  };
  telegramFallbackMode: "auto_redirect" | "button_only";
};

type FormState = {
  name: string;
  phone: string;
  city: string;
  messenger: string;
  message: string;
  honeypot: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  city: "",
  messenger: "telegram",
  message: "",
  honeypot: ""
};

const REDIRECT_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 7000;

function isPlaceholder(value: string): boolean {
  return value.includes("{{") && value.includes("}}");
}

function extractTelegramUsername(value: string): string {
  if (!value || isPlaceholder(value)) return "";

  const cleaned = value
    .trim()
    .replace(/^https?:\/\/t\.me\//, "")
    .replace(/^@/, "")
    .replace(/\?.*$/, "")
    .replace(/\/$/, "");

  return cleaned;
}

function buildTelegramFallbackLink(params: {
  fallbackUsername: string;
  fallbackUrl: string;
  text: string;
}) {
  const encodedText = encodeURIComponent(params.text);
  const fromUrlUsername = extractTelegramUsername(params.fallbackUrl);
  const username = extractTelegramUsername(params.fallbackUsername) || fromUrlUsername;

  if (username) {
    return `https://t.me/${username}?text=${encodedText}`;
  }

  const fallbackBase = !isPlaceholder(params.fallbackUrl) && params.fallbackUrl
    ? params.fallbackUrl
    : "https://t.me";

  const joinSymbol = fallbackBase.includes("?") ? "&" : "?";
  return `${fallbackBase}${joinSymbol}text=${encodedText}`;
}

function buildFallbackMessage(payload: {
  name: string;
  phone: string;
  city: string;
  messenger: string;
  message: string;
  pageUrl: string;
  source: string;
}) {
  return [
    "Заявка с сайта",
    `Имя: ${payload.name || "{{CLIENT_NAME}}"}`,
    `Телефон: ${payload.phone}`,
    `Город: ${payload.city || "{{CITY}}"}`,
    `Предпочтительный канал: ${payload.messenger}`,
    `Сообщение: ${payload.message || "{{CLIENT_MESSAGE}}"}`,
    `Страница: ${payload.pageUrl}`,
    `Источник: ${payload.source}`
  ].join("\n");
}

export function LeadForm({
  source,
  className,
  compact = false,
  leadEndpoint,
  telegramFallback,
  telegramFallbackMode
}: LeadFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fallbackLink, setFallbackLink] = useState<string>("");
  const [fallbackText, setFallbackText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => status !== "loading", [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFallbackLink("");
    setFallbackText("");
    setCopied(false);

    const payload = {
      name: formState.name,
      phone: formState.phone,
      city: formState.city,
      message: formState.message,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      source,
      honeypot: formState.honeypot
    };

    const fallbackMessage = buildFallbackMessage({
      name: payload.name,
      phone: payload.phone,
      city: payload.city,
      messenger: formState.messenger,
      message: payload.message,
      pageUrl: payload.pageUrl,
      source: payload.source
    });

    const telegramLink = buildTelegramFallbackLink({
      fallbackUsername: telegramFallback.username,
      fallbackUrl: telegramFallback.url,
      text: fallbackMessage
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      if (!leadEndpoint || isPlaceholder(leadEndpoint)) {
        throw new Error("LEAD_ENDPOINT_NOT_CONFIGURED");
      }

      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const result = (await response.json()) as { ok?: boolean };
      if (!result.ok) {
        throw new Error("ENDPOINT_RESPONSE_NOT_OK");
      }

      setStatus("success");
      setFormState(initialState);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Не удалось отправить автоматически. Сейчас откроется Telegram, чтобы отправить заявку вручную."
      );
      setFallbackLink(telegramLink);
      setFallbackText(fallbackMessage);

      if (telegramFallbackMode === "auto_redirect" && typeof window !== "undefined") {
        window.setTimeout(() => {
          window.location.href = telegramLink;
        }, REDIRECT_DELAY_MS);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async function onCopyFallbackText() {
    if (!fallbackText || typeof navigator === "undefined" || !navigator.clipboard) return;

    await navigator.clipboard.writeText(fallbackText);
    setCopied(true);
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <div className={cn("grid gap-3", compact ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
        <input
          type="text"
          value={formState.name}
          onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Ваше имя"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
        />
        <input
          required
          type="tel"
          value={formState.phone}
          onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Телефон или @username"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
        />
      </div>

      <div className={cn("grid gap-3", compact ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
        <input
          type="text"
          value={formState.city}
          onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))}
          placeholder="Город"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
        />

        <select
          value={formState.messenger}
          onChange={(event) => setFormState((prev) => ({ ...prev, messenger: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
        >
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="viber">Viber</option>
          <option value="phone">Звонок</option>
        </select>
      </div>

      <textarea
        required
        rows={compact ? 3 : 5}
        value={formState.message}
        onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
        placeholder="Опишите задачу. [TODO: вставьте реальные подсказки по данным для расчета]"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
      />

      <input
        tabIndex={-1}
        autoComplete="off"
        value={formState.honeypot}
        onChange={(event) => setFormState((prev) => ({ ...prev, honeypot: event.target.value }))}
        placeholder="Ваш сайт"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-3">
        <Button type="submit" variant="primary" disabled={!canSubmit}>
          {status === "loading" ? "Отправка..." : "Оставить заявку"}
        </Button>
        <p className="text-xs text-slate-500">Быстрее ответим, если сразу отправите фото/план в мессенджер.</p>
      </div>

      {status === "success" ? (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Заявка отправлена. Чтобы ускорить расчет, напишите в мессенджер и прикрепите фото/план.
        </p>
      ) : null}

      {status === "error" ? (
        <div className="space-y-2 rounded-xl bg-red-50 px-3 py-3 text-sm text-red-700">
          <p>{errorMessage}</p>
          {fallbackLink ? (
            <div className="flex flex-wrap gap-2">
              <a
                href={fallbackLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-700"
              >
                Отправить в Telegram сейчас
              </a>
              <button
                type="button"
                onClick={onCopyFallbackText}
                className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-700"
              >
                {copied ? "Текст скопирован" : "Скопировать текст заявки"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
