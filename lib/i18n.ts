import en from "@/content/i18n/en.json";
import ru from "@/content/i18n/ru.json";

type Locale = "ru" | "en";

const DEFAULT_LOCALE: Locale = "ru";

function normalizeLocale(input: string | undefined): Locale {
  if (!input) return DEFAULT_LOCALE;
  const value = input.trim().toLowerCase();
  return value === "en" ? "en" : "ru";
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

export function t(value: string, tokens?: Record<string, string | number>): string {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const fallback = (ru as Record<string, string>)[value] ?? value;
  const translated = dict[value] ?? fallback;
  return applyTokens(translated, tokens);
}
