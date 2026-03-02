import en from "@/content/i18n/home-more-info.en.json";
import ru from "@/content/i18n/home-more-info.ru.json";
import { getLocale } from "@/lib/i18n";

type HomeMoreInfoDictionary = typeof ru;
export type HomeMoreInfoLocaleKey = keyof HomeMoreInfoDictionary;

function getHomeMoreInfoDictionary() {
  const locale = getLocale();
  return locale === "en" ? (en as HomeMoreInfoDictionary) : (ru as HomeMoreInfoDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thmi(key: HomeMoreInfoLocaleKey, tokens?: Record<string, string | number>): string {
  const dict = getHomeMoreInfoDictionary();
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
