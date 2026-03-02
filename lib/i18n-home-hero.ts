import en from "@/content/i18n/home-hero.en.json";
import ru from "@/content/i18n/home-hero.ru.json";
import { getLocale } from "@/lib/i18n";

type HomeHeroDictionary = typeof ru;
export type HomeHeroLocaleKey = keyof HomeHeroDictionary;

function getHomeHeroDictionary() {
  const locale = getLocale();
  return locale === "en" ? (en as HomeHeroDictionary) : (ru as HomeHeroDictionary);
}

export function thh(key: HomeHeroLocaleKey): string {
  const dict = getHomeHeroDictionary();
  return dict[key] ?? ru[key] ?? key;
}
