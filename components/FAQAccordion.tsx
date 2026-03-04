"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/content/schemas";
import { t } from "@/lib/i18n";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <article key={item.id} className={`faq-row ${isOpen ? "is-open" : ""}`.trim()}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
            >
              <span className="faq-question">{t(item.question)}</span>
              <span className="faq-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div id={`faq-panel-${item.id}`} className="faq-panel" aria-hidden={!isOpen}>
              <div className="faq-panel-inner">
                <p>{t(item.answer)}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
