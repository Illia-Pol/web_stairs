import ru from "@/content/i18n/home-main.ru.json";

type HomeMainDictionary = typeof ru;
export type HomeMainLocaleKey = keyof HomeMainDictionary;

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thm(key: HomeMainLocaleKey, tokens?: Record<string, string | number>): string {
  const value = ru[key] ?? key;
  return applyTokens(value, tokens);
}
