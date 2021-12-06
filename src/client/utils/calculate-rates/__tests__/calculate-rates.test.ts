import calculateRates from '../index';
import { ExchangeRates } from '../../../api/exchange-rates-api/types';
import { RatesTable } from '../types';

const sampleRatesResponse: ExchangeRates = {
  success: true,
  timestamp: 1638793757,
  base: 'EUR',
  date: '2021-12-06',
  rates: {
    USD: 1.129797,
    GBP: 0.851217,
  },
};

const desiredRatesTable: RatesTable = {
  usdToGbp: 0.753425,
  usdToEur: 0.885115,
  eurToGbp: 0.851217,
  eurToUsd: 1.129797,
  gbpToEur: 1.174789,
  gbpToUsd: 1.327273,
};

describe('Calculate rates', () => {
  test('Should prepare a valid rates table for all currencies', () => {
    const ratesTable = calculateRates(sampleRatesResponse);
    expect(ratesTable).toMatchObject(desiredRatesTable);
  });
});
