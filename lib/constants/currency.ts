export const CURRENCY_META = {
  BYN: { code: "BYN", locale: "ru-BY" },
  RUB: { code: "RUB", locale: "ru-RU" }
} as const;

export type CurrencyCode = keyof typeof CURRENCY_META;

export const DEFAULT_CURRENCY: CurrencyCode = "BYN";
export const CURRENCY_CODES = Object.keys(CURRENCY_META) as CurrencyCode[];
export const CURRENCY_STORAGE_KEY = "site-preferred-currency";
export const CURRENCY_CHANGE_EVENT = "site:currency-change";
export const BYN_TO_RUB_RATE = 26.9;

export function isCurrencyCode(value: string): value is CurrencyCode {
  return value in CURRENCY_META;
}

export function formatCurrency(value: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const locale = CURRENCY_META[currency].locale;
  return `${new Intl.NumberFormat(locale).format(value)} ${currency}`;
}

export function convertFromByn(valueByn: number, currency: CurrencyCode): number {
  if (currency === "RUB") {
    return Math.round(valueByn * BYN_TO_RUB_RATE);
  }

  return Math.round(valueByn);
}
