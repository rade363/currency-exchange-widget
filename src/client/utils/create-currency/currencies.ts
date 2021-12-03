import { GBP, USD, EUR, Currency } from './types';

export const usd: USD = { name: 'USD', sign: '$' };
export const gbp: GBP = { name: 'GBP', sign: '£' };
export const eur: EUR = { name: 'EUR', sign: '€' };

export const currencies: Currency[] = [usd, gbp, eur];
