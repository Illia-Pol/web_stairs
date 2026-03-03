import en from "@/content/i18n/home-guarantee.en.json";
import ru from "@/content/i18n/home-guarantee.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomeGuaranteeDictionary = typeof ru;
export type HomeGuaranteeLocaleKey = keyof HomeGuaranteeDictionary;

function getHomeGuaranteeDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomeGuaranteeDictionary) : (ru as HomeGuaranteeDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thg(
  key: HomeGuaranteeLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getHomeGuaranteeDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
