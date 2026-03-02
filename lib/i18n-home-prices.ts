import en from "@/content/i18n/home-prices.en.json";
import ru from "@/content/i18n/home-prices.ru.json";
import { getLocale } from "@/lib/i18n";

type HomePricesDictionary = typeof ru;
export type HomePricesLocaleKey = keyof HomePricesDictionary;

function getHomePricesDictionary() {
  const locale = getLocale();
  return locale === "en" ? (en as HomePricesDictionary) : (ru as HomePricesDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thpr(key: HomePricesLocaleKey, tokens?: Record<string, string | number>): string {
  const dict = getHomePricesDictionary();
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
