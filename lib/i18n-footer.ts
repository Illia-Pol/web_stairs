import ru from "@/content/i18n/footer.ru.json";

type FooterDictionary = typeof ru;
export type FooterLocaleKey = keyof FooterDictionary;

export function thf(key: FooterLocaleKey): string {
  return ru[key] ?? key;
}
