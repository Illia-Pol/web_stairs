import en from "@/content/i18n/header.en.json";
import ru from "@/content/i18n/header.ru.json";
import { getLocale } from "@/lib/i18n";

type HeaderDictionary = typeof ru;
export type HeaderLocaleKey = keyof HeaderDictionary;

function getHeaderDictionary() {
  const locale = getLocale();
  return locale === "en" ? (en as HeaderDictionary) : (ru as HeaderDictionary);
}

export function th(key: HeaderLocaleKey): string {
  const dict = getHeaderDictionary();
  return dict[key] ?? ru[key] ?? key;
}
