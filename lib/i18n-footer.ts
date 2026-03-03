import en from "@/content/i18n/footer.en.json";
import ru from "@/content/i18n/footer.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type FooterDictionary = typeof ru;
export type FooterLocaleKey = keyof FooterDictionary;

export function thf(key: FooterLocaleKey, localeOverride?: Locale): string {
  const locale = localeOverride ?? getLocale();
  const dict = locale === "en" ? (en as FooterDictionary) : (ru as FooterDictionary);
  return dict[key] ?? ru[key] ?? key;
}
