import ru from "@/content/i18n/home-stair-types.ru.json";

type HomeStairTypesDictionary = typeof ru;
export type HomeStairTypesLocaleKey = keyof HomeStairTypesDictionary;

function applyTokens(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) return template;
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

export function thst(key: HomeStairTypesLocaleKey, tokens?: Record<string, string | number>): string {
  const value = ru[key] ?? key;
  return applyTokens(value, tokens);
}
