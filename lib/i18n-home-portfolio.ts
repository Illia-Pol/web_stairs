import en from "@/content/i18n/home-portfolio.en.json";
import ru from "@/content/i18n/home-portfolio.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomePortfolioDictionary = typeof ru;
export type HomePortfolioLocaleKey = keyof HomePortfolioDictionary;

function getHomePortfolioDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomePortfolioDictionary) : (ru as HomePortfolioDictionary);
}

export function thp(key: HomePortfolioLocaleKey, localeOverride?: Locale): string {
  const dict = getHomePortfolioDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
