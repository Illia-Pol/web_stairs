import type { SiteConfig } from "@/lib/content/schemas";
import { t } from "@/lib/i18n";

export function ContactBar({ site }: { site: SiteConfig }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-2 backdrop-blur sm:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
        <a href={`tel:${site.contacts.phoneMain}`} className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-coal">
          {t("Позвонить")}
        </a>
        <a href={site.messengers.telegram} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-coal">
          Telegram
        </a>
        <a href={site.messengers.whatsapp} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-coal">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
