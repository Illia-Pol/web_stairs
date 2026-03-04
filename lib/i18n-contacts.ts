import en from "@/content/i18n/contacts.en.json";
import ru from "@/content/i18n/contacts.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type ContactsDictionary = typeof ru;
export type ContactsLocaleKey = keyof ContactsDictionary;

function getContactsDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as ContactsDictionary) : (ru as ContactsDictionary);
}

export function thc(key: ContactsLocaleKey, localeOverride?: Locale): string {
  const dict = getContactsDictionary(localeOverride);
  return dict[key] ?? ru[key] ?? key;
}
