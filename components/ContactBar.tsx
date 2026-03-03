"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { SiteConfig } from "@/lib/content/schemas";
import { localeFromPathname, t, type Locale } from "@/lib/i18n";

export function ContactBar({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const [uiLocale, setUiLocale] = useState<Locale>("ru");

  useEffect(() => {
    if (!pathname) return;
    setUiLocale(localeFromPathname(pathname));
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-coal/95 p-2 text-ink backdrop-blur sm:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
        <a href={`tel:${site.contacts.phoneMain}`} className="rounded-lg border border-white/20 px-3 py-2 text-center text-xs font-semibold text-ink">
          {t("Позвонить", undefined, uiLocale)}
        </a>
        <a href={site.messengers.telegram} target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-3 py-2 text-center text-xs font-semibold text-ink">
          Telegram
        </a>
        <a href={site.messengers.whatsapp} target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-3 py-2 text-center text-xs font-semibold text-ink">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
