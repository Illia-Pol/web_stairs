export const CURRENCY_META = {
  BYN: { code: "BYN", locale: "ru-BY" },
  RUB: { code: "RUB", locale: "ru-RU" }
} as const;

export type CurrencyCode = keyof typeof CURRENCY_META;

export const DEFAULT_CURRENCY: CurrencyCode = "BYN";
export const CURRENCY_CODES = Object.keys(CURRENCY_META) as CurrencyCode[];

export function isCurrencyCode(value: string): value is CurrencyCode {
  return value in CURRENCY_META;
}

export function formatCurrency(value: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const locale = CURRENCY_META[currency].locale;
  return `${new Intl.NumberFormat(locale).format(value)} ${currency}`;
}
