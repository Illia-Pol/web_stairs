import en from "@/content/i18n/portfolio-hub.en.json";
import ru from "@/content/i18n/portfolio-hub.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type PortfolioHubDictionary = typeof ru;
export type PortfolioHubLocaleKey = keyof PortfolioHubDictionary;

function getPortfolioHubDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as PortfolioHubDictionary) : (ru as PortfolioHubDictionary);
}

export function thph(key: PortfolioHubLocaleKey, localeOverride?: Locale): string {
  const dict = getPortfolioHubDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
