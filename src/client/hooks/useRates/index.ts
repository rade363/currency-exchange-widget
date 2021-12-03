import { useEffect, useState } from 'react';
import { Nullable } from '../../../types';
import { RatesTable } from '../../utils/calculate-rates/types';
import { fetchRates } from '../../api/exchange-rates-api/rates';
import calculateRates from '../../utils/calculate-rates';

const useRates = () => {
  const [areRatesCollected, setAreRatesCollected] = useState<boolean>(false);
  const [rates, setRates] = useState<Nullable<RatesTable>>(null);

  useEffect(() => {
    if (!areRatesCollected) {
      fetchRates()
        .then(response => {
          setRates(calculateRates(response.data));
          setAreRatesCollected(true);
        })
        .catch(error => {
          console.error('[ERROR] Could not fetch rates', error);
        });
    }
  }, [areRatesCollected]);

  return {
    areRatesCollected,
    rates,
  };
};

export default useRates;
