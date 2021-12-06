import { CurrencyName, CurrencyWithRate } from './types';
import { RatesTable } from '../calculate-rates/types';
import { usd, gbp, eur } from './currencies';

function createCurrency(
  currentCurrencyName: CurrencyName,
  otherCurrencyName: CurrencyName,
  rates: RatesTable,
): CurrencyWithRate {
  if (currentCurrencyName === 'USD') {
    return {
      ...usd,
      rate: otherCurrencyName === 'EUR' ? rates.usdToEur : rates.usdToGbp,
    };
  }

  if (currentCurrencyName === 'GBP') {
    return {
      ...gbp,
      rate: otherCurrencyName === 'EUR' ? rates.gbpToEur : rates.gbpToUsd,
    };
  }

  return {
    ...eur,
    rate: otherCurrencyName === 'USD' ? rates.eurToUsd : rates.eurToGbp,
  };
}

export default createCurrency;
