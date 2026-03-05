"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { th } from "@/lib/i18n-header";
import { withBasePath } from "@/lib/paths";
import type { SiteConfig } from "@/lib/content/schemas";
import {
  CURRENCY_CHANGE_EVENT,
  CURRENCY_CODES,
  CURRENCY_STORAGE_KEY,
  type CurrencyCode,
  DEFAULT_CURRENCY,
  isCurrencyCode
} from "@/lib/constants/currency";

type Locale = "ru" | "en";

type LocaleSwitcherProps = {
  site: SiteConfig;
  currentLocale: Locale;
  className?: string;
  compact?: boolean;
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

export function LocaleSwitcher({ site, currentLocale, className, compact = false }: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const locale = currentLocale;
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && isCurrencyCode(saved)) {
        setCurrency(saved);
      }
    } catch {
      // no-op: localStorage may be unavailable
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  const localeOptions: Array<{ code: Locale; label: string; href: string }> = [
    { code: "ru", label: "RU", href: site.localeLinks.ru },
    { code: "en", label: "EN", href: site.localeLinks.en }
  ];

  const currencyOptions: Array<{ code: CurrencyCode; label: string }> = CURRENCY_CODES.map((code) => ({
    code,
    label: code
  }));

  const selectCurrency = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency);
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
      window.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { currency: nextCurrency } }));
    } catch {
      // no-op
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md font-semibold uppercase tracking-[0.1em] text-ink-soft/85 transition-colors hover:bg-white/5 hover:text-ink",
          compact ? "px-1.5 py-1 text-[10px]" : "px-2 py-1.5 text-[11px]"
        )}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{locale.toUpperCase()}</span>
        <span className="text-ink-soft/60">/</span>
        <span>{currency}</span>
        <span className={cn("text-[10px] transition-transform", isOpen && "rotate-180")}>▾</span>
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-40 mt-2 rounded-xl border border-white/10 bg-panel/95 text-ink shadow-card backdrop-blur transition-all duration-200",
          compact ? "min-w-[132px] p-1.5" : "min-w-[148px] p-2",
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
        )}
      >
        <div>
          <p className="mb-1.5 text-[9px] uppercase tracking-[0.12em] text-ink-soft">{th("switcher_language")}</p>
          <div className="grid grid-cols-2 gap-1">
            {localeOptions.map((option) => {
              const active = option.code === locale;
              const disabled = isPlaceholder(option.href);
              const href = resolveHref(option.href);

              return (
                <a
                  key={option.code}
                  href={disabled ? "#" : href}
                  aria-disabled={disabled}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase transition-colors",
                    active ? "bg-bronze text-coal" : "text-ink-soft hover:bg-white/10 hover:text-ink",
                    disabled && "pointer-events-none opacity-50"
                  )}
                >
                  {option.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-2.5 border-t border-white/10 pt-2.5">
          <p className="mb-1.5 text-[9px] uppercase tracking-[0.12em] text-ink-soft">{th("switcher_currency")}</p>
          <div className="grid grid-cols-2 gap-1">
            {currencyOptions.map((option) => {
              const active = option.code === currency;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => selectCurrency(option.code)}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase transition-colors",
                    active ? "bg-bronze text-coal" : "text-ink-soft hover:bg-white/10 hover:text-ink"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
