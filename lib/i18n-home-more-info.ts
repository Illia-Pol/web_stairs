import ru from "@/content/i18n/home-more-info.ru.json";

type HomeMoreInfoDictionary = typeof ru;
export type HomeMoreInfoLocaleKey = keyof HomeMoreInfoDictionary;

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thmi(key: HomeMoreInfoLocaleKey, tokens?: Record<string, string | number>): string {
  const value = ru[key] ?? key;
  return applyTokens(value, tokens);
}
