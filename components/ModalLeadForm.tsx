"use client";

import { useState } from "react";

import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

type ModalLeadFormProps = {
  triggerLabel?: string;
  source: string;
  leadEndpoint: string;
  telegramFallback: {
    username: string;
    url: string;
  };
  telegramFallbackMode: "auto_redirect" | "button_only";
};

export function ModalLeadForm({
  triggerLabel = t("Оставить заявку"),
  source,
  leadEndpoint,
  telegramFallback,
  telegramFallbackMode
}: ModalLeadFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-coal/82 px-4">
          <div className="w-full max-w-xl rounded-xl2 border border-white/10 bg-panel p-6 text-ink shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-2xl uppercase">{t("Оставить заявку")}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-ink-soft hover:bg-white/10"
              >
                {t("Закрыть")}
              </button>
            </div>

            <LeadForm
              source={source}
              compact
              leadEndpoint={leadEndpoint}
              telegramFallback={telegramFallback}
              telegramFallbackMode={telegramFallbackMode}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
