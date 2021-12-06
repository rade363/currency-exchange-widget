export type USD = { name: 'USD', sign: '$' };
export type GBP = { name: 'GBP', sign: '£' };
export type EUR = { name: 'EUR', sign: '€' };

export type Currency = USD | GBP | EUR;

export type CurrencyName = 'USD' | 'GBP' | 'EUR';

export type CurrencyWithRate = {
  rate: number;
} & Currency;
