import en from "@/content/i18n/lead-section.en.json";
import ru from "@/content/i18n/lead-section.ru.json";
import { getLocale, type Locale } from "@/lib/i18n";

type LeadSectionDictionary = typeof ru;
export type LeadSectionLocaleKey = keyof LeadSectionDictionary;

function getLeadSectionDictionary(localeOverride?: Locale) {
  const locale = localeOverride ?? getLocale();
  return locale === "en" ? (en as LeadSectionDictionary) : (ru as LeadSectionDictionary);
}

function applyTokens(template: string, tokens?: Record<string, string | number>) {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thls(
  key: LeadSectionLocaleKey,
  tokens?: Record<string, string | number>,
  localeOverride?: Locale
): string {
  const dict = getLeadSectionDictionary(localeOverride);
  const value = dict[key] ?? ru[key] ?? key;
  return applyTokens(value, tokens);
}
