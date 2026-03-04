import en from "@/content/i18n/portfolio-master.en.json";
import ru from "@/content/i18n/portfolio-master.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type PortfolioMasterDictionary = typeof ru;
export type PortfolioMasterLocaleKey = keyof PortfolioMasterDictionary;

function getPortfolioMasterDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as PortfolioMasterDictionary) : (ru as PortfolioMasterDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thpm(
  key: PortfolioMasterLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getPortfolioMasterDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
