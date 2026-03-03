import en from "@/content/i18n/home-prices.en.json";
import ru from "@/content/i18n/home-prices.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomePricesDictionary = typeof ru;
export type HomePricesLocaleKey = keyof HomePricesDictionary;

function getHomePricesDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomePricesDictionary) : (ru as HomePricesDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thpr(
  key: HomePricesLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getHomePricesDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
