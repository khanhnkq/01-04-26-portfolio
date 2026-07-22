export interface CoffeePreset {
  count: number;
  label: string;
  amountVnd: number;
  amountUsd: number;
  icon: string;
  popular?: boolean;
}

export const COFFEE_PRICE_VND = 30_000;
export const MIN_CUPS = 1;
export const MAX_CUPS = 20;

export const COFFEE_PRESETS: CoffeePreset[] = [
  {
    count: 1,
    label: "One cup",
    amountVnd: COFFEE_PRICE_VND,
    amountUsd: 1.5,
    icon: "(^ ᴗ ^)",
  },
  {
    count: 3,
    label: "Three cups",
    amountVnd: 3 * COFFEE_PRICE_VND,
    amountUsd: 4.5,
    icon: "(♡ ‿ ♡)",
    popular: true,
  },
  {
    count: 5,
    label: "Five cups",
    amountVnd: 5 * COFFEE_PRICE_VND,
    amountUsd: 7.5,
    icon: "(づ｡◕‿‿◕｡)づ",
  },
];
