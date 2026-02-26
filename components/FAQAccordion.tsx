"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/content/schemas";
import { t } from "@/lib/i18n";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="overflow-hidden rounded-[12px] border border-slate-300/80 bg-white/95">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="font-semibold text-graphite">{t(item.question)}</span>
              <span className="text-xl text-bronze">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen ? <p className="border-t border-slate-200/80 px-4 py-4 text-sm text-slate-600">{t(item.answer)}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
