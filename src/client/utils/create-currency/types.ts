type USD = { name: 'USD', sign: '$', rate: number };
type GBP = { name: 'GBP', sign: '£', rate: number };
type EUR = { name: 'EUR', sign: '€', rate: number };

export type Currency = USD | GBP | EUR;

export type CurrencyName = 'USD' | 'GBP' | 'EUR';
