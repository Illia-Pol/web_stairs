import en from "@/content/i18n/home-stair-types.en.json";
import ru from "@/content/i18n/home-stair-types.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HomeStairTypesDictionary = typeof ru;
export type HomeStairTypesLocaleKey = keyof HomeStairTypesDictionary;

function getHomeStairTypesDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HomeStairTypesDictionary) : (ru as HomeStairTypesDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thst(
  key: HomeStairTypesLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getHomeStairTypesDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
