import { ExchangeRates } from '../../api/exchange-rates-api/types';
import { RatesTable } from './types';

function calculateRates(exchangeRates: ExchangeRates): RatesTable {
  return {
    usdToGbp: Number((exchangeRates.rates.GBP / exchangeRates.rates.USD).toFixed(2)),
    usdToEur: Number((1 / exchangeRates.rates.USD).toFixed(2)),
    eurToGbp: Number(exchangeRates.rates.GBP.toFixed(2)),
    eurToUsd: Number(exchangeRates.rates.USD.toFixed(2)),
    gbpToEur: Number((1 / exchangeRates.rates.GBP).toFixed(2)),
    gbpToUsd: Number((exchangeRates.rates.USD / exchangeRates.rates.GBP).toFixed(2)),
  };
}

export default calculateRates;
