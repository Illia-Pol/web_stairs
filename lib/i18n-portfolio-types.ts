import en from "@/content/i18n/portfolio-types.en.json";
import ru from "@/content/i18n/portfolio-types.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type PortfolioTypesDictionary = typeof ru;
export type PortfolioTypesLocaleKey = keyof PortfolioTypesDictionary;

function getPortfolioTypesDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as PortfolioTypesDictionary) : (ru as PortfolioTypesDictionary);
}

export function thpt(key: PortfolioTypesLocaleKey, localeOverride?: Locale): string {
  const dict = getPortfolioTypesDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
