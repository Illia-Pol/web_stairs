import en from "@/content/i18n/header.en.json";
import ru from "@/content/i18n/header.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type HeaderDictionary = typeof ru;
export type HeaderLocaleKey = keyof HeaderDictionary;

function getHeaderDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as HeaderDictionary) : (ru as HeaderDictionary);
}

export function th(key: HeaderLocaleKey, localeOverride?: Locale): string {
  const dict = getHeaderDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
