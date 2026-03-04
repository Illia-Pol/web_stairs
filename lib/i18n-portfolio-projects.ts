import en from "@/content/i18n/portfolio-projects.en.json";
import ru from "@/content/i18n/portfolio-projects.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type PortfolioProjectsDictionary = typeof ru;
export type PortfolioProjectsLocaleKey = keyof PortfolioProjectsDictionary;

function getPortfolioProjectsDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as PortfolioProjectsDictionary) : (ru as PortfolioProjectsDictionary);
}

export function thpp(key: PortfolioProjectsLocaleKey, localeOverride?: Locale): string {
  const dict = getPortfolioProjectsDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
