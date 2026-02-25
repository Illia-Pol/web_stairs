"use client";

import { useState } from "react";

import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/Button";

type ModalLeadFormProps = {
  triggerLabel?: string;
  source: string;
};

export function ModalLeadForm({ triggerLabel = "Оставить заявку", source }: ModalLeadFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-coal/75 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-2xl uppercase text-coal">Оставить заявку</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
              >
                Закрыть
              </button>
            </div>

            <LeadForm source={source} compact />
          </div>
        </div>
      ) : null}
    </>
  );
}
