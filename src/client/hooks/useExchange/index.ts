import { useEffect, useState } from 'react';
import createCurrency from '../../utils/create-currency';
import { Account } from './types';
import { Nullable } from '../../../types';
import { UserAccount } from '../../components/app/types';
import { AccountType } from '../../components/account-block/types';
import { SetAccountsCallback } from '../../components/exchange-block/types';
import { RatesTable } from '../../utils/calculate-rates/types';
import { MAX_INPUT_VALUE } from '../../constants';

function validateValue(value: string, balance: number): Nullable<string> {
  if (Number(value) > Number(MAX_INPUT_VALUE)) {
    return `Max value: ${MAX_INPUT_VALUE.length} digits`;
  }

  const remaining = balance - Number(value);

  if (remaining < 0) {
    return `Insufficient funds: ${remaining.toFixed(2)}`;
  }

  return null;
}

const useExchange = (rates: RatesTable, accounts: UserAccount[], setAccounts: SetAccountsCallback) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [accountFrom, setAccountFrom] = useState<Nullable<Account>>(null);
  const [accountTo, setAccountTo] = useState<Nullable<Account>>(null);
  const [accountToReplace, setAccountToReplace] = useState<Nullable<Account>>(null);
  const [accountToReplaceType, setAccountToReplaceType] = useState<Nullable<AccountType>>(null);

  useEffect(() => {
    const [firstAccount, secondAccount] = accounts;

    setAccountFrom(prevAccountFrom => {
      if (prevAccountFrom && accountTo) {
        return {
          ...prevAccountFrom,
          currency: createCurrency(prevAccountFrom.currency.name, accountTo.currency.name, rates),
        };
      }

      return {
        balance: firstAccount.balance,
        change: '0.00',
        result: null,
        error: null,
        currency: createCurrency(firstAccount.name, secondAccount.name, rates),
      };
    });

    setAccountTo(prevAccountTo => {
      if (prevAccountTo && accountFrom) {
        return {
          ...prevAccountTo,
          currency: createCurrency(prevAccountTo.currency.name, accountFrom.currency.name, rates),
        };
      }

      return {
        balance: secondAccount.balance,
        change: '0.00',
        result: null,
        error: null,
        currency: createCurrency(secondAccount.name, firstAccount.name, rates),
      };
    });
  }, [rates, accounts]);

  const handleAccountFromInputChange = (value: string) => {
    setAccountFrom(prevAccountFrom => {
      if (!prevAccountFrom) {
        return null;
      }

      return {
        ...prevAccountFrom,
        change: value,
        result: (prevAccountFrom.balance - Number(value)).toFixed(2),
        error: validateValue(value, prevAccountFrom.balance),
      };
    });

    setAccountTo(prevAccountTo => {
      if (!prevAccountTo || !accountFrom) {
        return null;
      }

      const change = (Number(value) * accountFrom.currency.rate).toFixed(2);

      return {
        ...prevAccountTo,
        change,
        result: (prevAccountTo.balance + Number(change)).toFixed(2),
      };
    });
  };

  const handleAccountToInputChange = (value: string) => {
    setAccountTo(prevAccountTo => {
      if (!prevAccountTo) {
        return null;
      }

      return {
        ...prevAccountTo,
        change: value,
        result: (prevAccountTo.balance + Number(value)).toFixed(2),
      };
    });

    setAccountFrom(prevAccountFrom => {
      if (!prevAccountFrom || !accountTo) {
        return null;
      }

      const change = (Number(value) * accountTo.currency.rate).toFixed(2);

      return {
        ...prevAccountFrom,
        change,
        result: (prevAccountFrom.balance - Number(change)).toFixed(2),
        error: validateValue(change, prevAccountFrom.balance),
      };
    });
  };

  const swapAccounts = () => {
    if (!accountFrom || !accountTo) {
      return;
    }

    const tempAccountFrom = {
      ...accountFrom,
      result: null,
      error: null,
    };
    const tempAccountTo = {
      ...accountTo,
      result: (accountTo.balance - Number(accountTo.change)).toFixed(2),
      error: validateValue(accountTo.change, accountTo.balance),
    };
    setAccountFrom(tempAccountTo);
    setAccountTo(tempAccountFrom);
  };

  const chooseFromAccount = () => {
    setIsSelectorOpen(true);
    setAccountToReplaceType('From');
    setAccountToReplace(accountFrom);
  };

  const chooseToAccount = () => {
    setIsSelectorOpen(true);
    setAccountToReplaceType('To');
    setAccountToReplace(accountTo);
  };

  const closeSelector = () => {
    setIsSelectorOpen(false);
    setAccountToReplaceType(null);
    setAccountToReplace(null);
  };

  return {
    isSelectorOpen,
    accountFrom,
    accountTo,
    accountToReplace,
    accountToReplaceType,
    handleAccountFromInputChange,
    handleAccountToInputChange,
    swapAccounts,
    chooseFromAccount,
    chooseToAccount,
    closeSelector,
  };
};

export default useExchange;
