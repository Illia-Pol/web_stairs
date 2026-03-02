import ru from "@/content/i18n/home-prices.ru.json";

type HomePricesDictionary = typeof ru;
export type HomePricesLocaleKey = keyof HomePricesDictionary;

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thpr(key: HomePricesLocaleKey, tokens?: Record<string, string | number>): string {
  const value = ru[key] ?? key;
  return applyTokens(value, tokens);
}
