import en from "@/content/i18n/home-main.en.json";
import ru from "@/content/i18n/home-main.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomeMainDictionary = typeof ru;
export type HomeMainLocaleKey = keyof HomeMainDictionary;

function getHomeMainDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomeMainDictionary) : (ru as HomeMainDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thm(
  key: HomeMainLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getHomeMainDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
