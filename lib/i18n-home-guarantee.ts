import ru from "@/content/i18n/home-guarantee.ru.json";

type HomeGuaranteeDictionary = typeof ru;
export type HomeGuaranteeLocaleKey = keyof HomeGuaranteeDictionary;

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thg(key: HomeGuaranteeLocaleKey, tokens?: Record<string, string | number>): string {
  const value = ru[key] ?? key;
  return applyTokens(value, tokens);
}
