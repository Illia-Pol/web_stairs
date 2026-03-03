import en from "@/content/i18n/en.json";
import ru from "@/content/i18n/ru.json";

type Locale = "ru" | "en";

const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_STORAGE_KEY = "site-preferred-locale";

function normalizeLocale(input: string | undefined): Locale {
  if (!input) return DEFAULT_LOCALE;
  const value = input.trim().toLowerCase();
  return value === "en" ? "en" : "ru";
}

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get("lang");
      const fromPath = window.location.pathname.split("/").filter(Boolean)[0];
      const fromStorage = window.localStorage.getItem(LOCALE_STORAGE_KEY);

      const resolved = normalizeLocale(fromQuery || fromPath || fromStorage || process.env.NEXT_PUBLIC_LOCALE);
      window.localStorage.setItem(LOCALE_STORAGE_KEY, resolved);
      return resolved;
    } catch {
      return normalizeLocale(process.env.NEXT_PUBLIC_LOCALE);
    }
  }

  return normalizeLocale(process.env.NEXT_PUBLIC_LOCALE);
}

function getDictionary(locale: Locale): Record<string, string> {
  if (locale === "en") {
    return en as Record<string, string>;
  }

  return ru as Record<string, string>;
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;

  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function t(value: string, tokens?: Record<string, string | number>): string {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const fallback = (ru as Record<string, string>)[value] ?? value;
  const translated = dict[value] ?? fallback;
  return applyTokens(translated, tokens);
}
