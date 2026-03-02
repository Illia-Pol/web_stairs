import en from "@/content/i18n/footer.en.json";
import ru from "@/content/i18n/footer.ru.json";
import { getLocale } from "@/lib/i18n";

type FooterDictionary = typeof ru;
export type FooterLocaleKey = keyof FooterDictionary;

export function thf(key: FooterLocaleKey): string {
  const locale = getLocale();
  const dict = locale === "en" ? (en as FooterDictionary) : (ru as FooterDictionary);
  return dict[key] ?? ru[key] ?? key;
}
