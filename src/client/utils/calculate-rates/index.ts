import { ExchangeRates } from '../../api/exchange-rates-api/types';
import { RatesTable } from './types';
import { EXCHANGE_RATES_DECIMAL_ACCURACY } from '../../constants';

function calculateRates(exchangeRates: ExchangeRates): RatesTable {
  return {
    usdToGbp: Number((exchangeRates.rates.GBP / exchangeRates.rates.USD).toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
    usdToEur: Number((1 / exchangeRates.rates.USD).toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
    eurToGbp: Number(exchangeRates.rates.GBP.toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
    eurToUsd: Number(exchangeRates.rates.USD.toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
    gbpToEur: Number((1 / exchangeRates.rates.GBP).toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
    gbpToUsd: Number((exchangeRates.rates.USD / exchangeRates.rates.GBP).toFixed(EXCHANGE_RATES_DECIMAL_ACCURACY)),
  };
}

export default calculateRates;
