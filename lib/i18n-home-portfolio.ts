import en from "@/content/i18n/home-portfolio.en.json";
import ru from "@/content/i18n/home-portfolio.ru.json";
import { getLocale } from "@/lib/i18n";

type HomePortfolioDictionary = typeof ru;
export type HomePortfolioLocaleKey = keyof HomePortfolioDictionary;

function getHomePortfolioDictionary() {
  const locale = getLocale();
  return locale === "en" ? (en as HomePortfolioDictionary) : (ru as HomePortfolioDictionary);
}

export function thp(key: HomePortfolioLocaleKey): string {
  const dict = getHomePortfolioDictionary();
  return dict[key] ?? ru[key] ?? key;
}
