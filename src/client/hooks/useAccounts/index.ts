import { useEffect, useState } from 'react';
import { fetchRates } from '../../api/exchange-rates-api/rates';
import calculateRates from '../../utils/calculate-rates';
import createCurrency from '../../utils/create-currency';
import { User } from './types';
import { Nullable } from '../../../types';
import { Account } from '../../components/account-block/types';
import { RatesTable } from '../../utils/calculate-rates/types';

const useAccounts = (user: User) => {
  const [areRatesCollected, setAreRatesCollected] = useState<boolean>(false);
  const [rates, setRates] = useState<Nullable<RatesTable>>(null);
  const [accountFrom, setAccountFrom] = useState<Nullable<Account>>(null);
  const [accountTo, setAccountTo] = useState<Nullable<Account>>(null);

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

  useEffect(() => {
    if (areRatesCollected && rates) {
      const [firstAccount, secondAccount] = user.accounts;
      setAccountFrom({
        balance: firstAccount.balance,
        currency: createCurrency(firstAccount.name, secondAccount.name, rates),
      });
      setAccountTo({
        balance: secondAccount.balance,
        currency: createCurrency(secondAccount.name, firstAccount.name, rates),
      });
    }
  }, [areRatesCollected, rates, user.accounts]);

  return {
    areRatesCollected,
    accountFrom,
    accountTo,
  };
};

export default useAccounts;
