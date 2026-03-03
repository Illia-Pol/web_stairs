import en from "@/content/i18n/home-hero.en.json";
import ru from "@/content/i18n/home-hero.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomeHeroDictionary = typeof ru;
export type HomeHeroLocaleKey = keyof HomeHeroDictionary;

function getHomeHeroDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomeHeroDictionary) : (ru as HomeHeroDictionary);
}

export function thh(key: HomeHeroLocaleKey, localeOverride?: Locale): string {
  const dict = getHomeHeroDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
