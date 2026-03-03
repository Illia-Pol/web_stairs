import en from "@/content/i18n/en.json";
import ru from "@/content/i18n/ru.json";

export type Locale = "ru" | "en";

const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_STORAGE_KEY = "site-preferred-locale";

export function normalizeLocale(input: string | undefined | null): Locale {
  if (!input) return DEFAULT_LOCALE;
  const value = input.trim().toLowerCase();
  return value === "en" ? "en" : "ru";
}

export function localeFromPathname(pathname: string | undefined | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return normalizeLocale(firstSegment);
}

export function getLocale(): Locale {
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

export function t(value: string, tokens?: Record<string, string | number>, localeOverride?: Locale): string {
  const locale = localeOverride ?? getLocale();
  const dict = getDictionary(locale);
  const fallback = (ru as Record<string, string>)[value] ?? value;
  const translated = dict[value] ?? fallback;
  return applyTokens(translated, tokens);
}
