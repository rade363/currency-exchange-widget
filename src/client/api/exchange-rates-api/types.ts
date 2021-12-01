export type Rates = {
  USD: number;
  GBP: number;
};

export type ExchangeRates = {
  success: boolean;
  timestamp: number;
  base: 'EUR';
  date: string;
  rates: Rates;
};
