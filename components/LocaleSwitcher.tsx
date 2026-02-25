import { t } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";
import type { SiteConfig } from "@/lib/content/schemas";

type Locale = "ru" | "en";

type LocaleSwitcherProps = {
  site: SiteConfig;
  currentLocale: Locale;
};

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function isPlaceholder(value: string): boolean {
  return value.includes("{{") && value.includes("}}");
}

function resolveHref(raw: string): string {
  if (isExternal(raw) || isPlaceholder(raw)) return raw;
  return withBasePath(raw);
}

export function LocaleSwitcher({ site, currentLocale }: LocaleSwitcherProps) {
  const options: Array<{ code: Locale; href: string }> = [
    { code: "ru", href: site.localeLinks.ru },
    { code: "en", href: site.localeLinks.en }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-soft backdrop-blur">
      <p className="px-2 pb-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">{t("Язык")}</p>
      <div className="flex items-center gap-1">
        {options.map((option) => {
          const active = option.code === currentLocale;
          const disabled = isPlaceholder(option.href);
          const href = resolveHref(option.href);

          return (
            <a
              key={option.code}
              href={disabled ? "#" : href}
              aria-disabled={disabled}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
                active ? "bg-coal text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              } ${disabled ? "pointer-events-none opacity-50" : ""}`}
            >
              {option.code}
            </a>
          );
        })}
      </div>
    </div>
  );
}
