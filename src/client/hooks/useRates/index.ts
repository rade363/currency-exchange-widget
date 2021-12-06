import { useEffect, useState } from 'react';
import { Nullable } from '../../../types';
import { RatesTable } from '../../utils/calculate-rates/types';
import { fetchRates } from '../../api/exchange-rates-api/rates';
import calculateRates from '../../utils/calculate-rates';
import { RATES_REFRESH_ENABLED, RATES_REFRESH_MS } from '../../constants';

const useRates = () => {
  const [areRatesCollected, setAreRatesCollected] = useState<boolean>(false);
  const [rates, setRates] = useState<Nullable<RatesTable>>(null);

  const collectRates = () => {
    fetchRates()
      .then(response => {
        setAreRatesCollected(true);
        setRates(calculateRates(response.data));
        console.info(`[INFO] Rates collected at ${new Date().toISOString()}`);
      })
      .catch(error => {
        console.error('[ERROR] Could not fetch rates', error);
      });
  };

  useEffect(() => {
    if (!areRatesCollected) {
      collectRates();
    }

    if (!RATES_REFRESH_ENABLED) {
      return;
    }

    const timerId = setTimeout(collectRates, RATES_REFRESH_MS);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId);
    };
  }, [areRatesCollected, rates]);

  return {
    areRatesCollected,
    rates,
  };
};

export default useRates;
