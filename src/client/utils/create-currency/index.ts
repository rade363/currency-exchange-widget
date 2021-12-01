import { Currency, CurrencyName } from './types';
import { RatesTable } from '../calculate-rates/types';

function createCurrency(
  currentCurrencyName: CurrencyName,
  otherCurrencyName: CurrencyName,
  rates: RatesTable,
): Currency {
  if (currentCurrencyName === 'USD') {
    return {
      name: 'USD',
      sign: '$',
      rate: otherCurrencyName === 'EUR' ? rates.usdToEur : rates.usdToGbp,
    };
  }

  if (currentCurrencyName === 'GBP') {
    return {
      name: 'GBP',
      sign: '£',
      rate: otherCurrencyName === 'EUR' ? rates.gbpToEur : rates.gbpToUsd,
    };
  }

  return {
    name: 'EUR',
    sign: '€',
    rate: otherCurrencyName === 'USD' ? rates.eurToUsd : rates.eurToGbp,
  };
}

export default createCurrency;
