"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type LeadFormProps = {
  source: string;
  className?: string;
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  messenger: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  messenger: "telegram",
  message: ""
};

export function LeadForm({ source, className, compact = false }: LeadFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formState,
          source
        })
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setFormState(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <div className={cn("grid gap-3", compact ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
        <input
          required
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

      <textarea
        required
        rows={compact ? 3 : 5}
        value={formState.message}
        onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
        placeholder="Опишите задачу. [TODO: вставьте реальные подсказки по данным для расчета]"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-coal outline-none focus:border-bronze"
      />

      <div className="flex items-center justify-between gap-3">
        <Button type="submit" variant="primary" disabled={status === "loading"}>
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
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          Не удалось отправить форму. Повторите позже или напишите напрямую в мессенджер.
        </p>
      ) : null}
    </form>
  );
}
