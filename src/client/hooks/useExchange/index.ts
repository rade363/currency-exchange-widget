import { useCallback, useEffect, useState } from 'react';
import createCurrency from '../../utils/create-currency';
import { Account } from './types';
import { Nullable } from '../../../types';
import { UserAccount } from '../../components/app/types';
import { AccountType } from '../../components/account-block/types';
import { SetAccountsCallback } from '../../controllers/exchange-controller/types';
import { RatesTable } from '../../utils/calculate-rates/types';
import { MAX_INPUT_VALUE, DECIMAL_ACCURACY, RESULT_TIMEOUT_MS } from '../../constants';
import { CurrencyName } from '../../utils/create-currency/types';

function validateValue(value: string, balance: number): Nullable<string> {
  if (Number(value) > Number(MAX_INPUT_VALUE)) {
    return `Max value: ${MAX_INPUT_VALUE.length} digits`;
  }

  const remaining = balance - Number(value);

  if (remaining < 0) {
    return `Insufficient funds: ${remaining.toFixed(DECIMAL_ACCURACY)}`;
  }

  return null;
}

const useExchange = (rates: RatesTable, accounts: UserAccount[], setAccounts: SetAccountsCallback) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [accountFrom, setAccountFrom] = useState<Nullable<Account>>(null);
  const [accountTo, setAccountTo] = useState<Nullable<Account>>(null);
  const [accountToReplaceType, setAccountToReplaceType] = useState<Nullable<AccountType>>(null);
  const [transferResult, setTransferResult] = useState<Nullable<string>>(null);

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

      const newValue = Number(value);

      return {
        ...prevAccountFrom,
        change: value,
        result: newValue === 0 ? null : (prevAccountFrom.balance - newValue).toFixed(DECIMAL_ACCURACY),
        error: validateValue(value, prevAccountFrom.balance),
      };
    });

    setAccountTo(prevAccountTo => {
      if (!prevAccountTo || !accountFrom) {
        return null;
      }

      const newValue = Number(value);
      const change = (newValue * accountFrom.currency.rate).toFixed(DECIMAL_ACCURACY);

      return {
        ...prevAccountTo,
        change,
        result: newValue === 0 ? null : (prevAccountTo.balance + Number(change)).toFixed(DECIMAL_ACCURACY),
      };
    });
  };

  const handleAccountToInputChange = (value: string) => {
    setAccountTo(prevAccountTo => {
      if (!prevAccountTo) {
        return null;
      }

      const newValue = Number(value);

      return {
        ...prevAccountTo,
        change: value,
        result: newValue === 0 ? null : (prevAccountTo.balance + newValue).toFixed(DECIMAL_ACCURACY),
      };
    });

    setAccountFrom(prevAccountFrom => {
      if (!prevAccountFrom || !accountTo) {
        return null;
      }

      const newValue = Number(value);
      const change = (newValue * accountTo.currency.rate).toFixed(DECIMAL_ACCURACY);

      return {
        ...prevAccountFrom,
        change,
        result: newValue === 0 ? null : (prevAccountFrom.balance - Number(change)).toFixed(DECIMAL_ACCURACY),
        error: validateValue(change, prevAccountFrom.balance),
      };
    });
  };

  const swapAccounts = useCallback(() => {
    if (!accountFrom || !accountTo) {
      return;
    }

    const tempAccountFrom = {
      ...accountFrom,
      result: null,
      error: null,
    };
    const accountToChange = Number(accountTo.change);
    const tempAccountTo = {
      ...accountTo,
      result: accountToChange === 0 ? null : (accountTo.balance - accountToChange).toFixed(DECIMAL_ACCURACY),
      error: validateValue(accountTo.change, accountTo.balance),
    };
    setAccountFrom(tempAccountTo);
    setAccountTo(tempAccountFrom);
  }, [accountFrom, accountTo]);

  const chooseFromAccount = () => {
    setIsSelectorOpen(true);
    setAccountToReplaceType('From');
  };

  const chooseToAccount = () => {
    setIsSelectorOpen(true);
    setAccountToReplaceType('To');
  };

  const closeSelector = () => {
    setIsSelectorOpen(false);
    setAccountToReplaceType(null);
  };

  const changeAccount = useCallback((newAccountName: CurrencyName) => () => {
    const accountToReplace = accountToReplaceType === 'From' ? accountFrom : accountTo;
    const otherAccount = accountToReplaceType === 'From' ? accountTo : accountFrom;
    if (!accountToReplace || !otherAccount) {
      return;
    }

    if (newAccountName === accountToReplace.currency.name) {
      closeSelector();
      return;
    }

    if (newAccountName === otherAccount.currency.name) {
      swapAccounts();
      closeSelector();
      return;
    }

    const relevantUserAccount = accounts.find(account => account.name === newAccountName);
    const newAccount = {
      balance: relevantUserAccount!.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: createCurrency(relevantUserAccount!.name, otherAccount.currency.name, rates),
    };

    if (accountToReplaceType === 'From') {
      setAccountTo(prevAccountTo => {
        if (!prevAccountTo) {
          return null;
        }

        return {
          ...prevAccountTo,
          currency: createCurrency(prevAccountTo.currency.name, newAccount.currency.name, rates),
          change: '0.00',
          result: null,
          error: null,
        };
      });
      setAccountFrom(newAccount);
      closeSelector();

      return;
    }

    setAccountFrom(prevAccountFrom => {
      if (!prevAccountFrom) {
        return null;
      }

      return {
        ...prevAccountFrom,
        currency: createCurrency(prevAccountFrom.currency.name, newAccount.currency.name, rates),
        change: '0.00',
        result: null,
        error: null,
      };
    });
    setAccountTo(newAccount);
    closeSelector();
  }, [accountFrom, accountTo, accountToReplaceType, accounts, rates, swapAccounts]);

  const transferMoney = (isButtonActive: boolean, isErrorPresent: boolean) => {
    if (!accountFrom || !accountTo || isErrorPresent || !isButtonActive) {
      return;
    }

    const signFrom = accountFrom.currency.sign;
    const changeFrom = accountFrom.change;
    const signTo = accountTo.currency.sign;
    const changeTo = accountTo.change;

    setTransferResult(`You exchanged ${signFrom}${changeFrom} to ${signTo}${changeTo}`);

    setTimeout(() => {
      setTransferResult(null);
    }, RESULT_TIMEOUT_MS);

    setAccounts((prevAccounts: UserAccount[]) => prevAccounts.map(userAccount => {
      if (userAccount.name === accountFrom.currency.name) {
        return {
          ...userAccount,
          balance: Number(accountFrom.result),
        };
      }

      if (userAccount.name === accountTo.currency.name) {
        return {
          ...userAccount,
          balance: Number(accountTo.result),
        };
      }

      return userAccount;
    }));

    setAccountFrom(prevAccountFrom => {
      if (!prevAccountFrom) {
        return null;
      }

      return {
        ...prevAccountFrom,
        balance: Number(prevAccountFrom.result),
        change: '0.00',
        result: null,
      };
    });

    setAccountTo(prevAccountTo => {
      if (!prevAccountTo) {
        return null;
      }

      return {
        ...prevAccountTo,
        balance: Number(prevAccountTo.result),
        change: '0.00',
        result: null,
      };
    });
  };

  const closeResult = () => setTransferResult(null);

  return {
    isSelectorOpen,
    transferResult,
    accountFrom,
    accountTo,
    accountToReplaceType,
    handleAccountFromInputChange,
    handleAccountToInputChange,
    swapAccounts,
    chooseFromAccount,
    chooseToAccount,
    closeSelector,
    changeAccount,
    transferMoney,
    closeResult,
  };
};

export default useExchange;
