import React from 'react';
import { OwnProps } from './types';
import useExchange from '../../hooks/useExchange';
import Loader from '../../components/loader';
import AccountSelector from '../../components/account-selector';
import ResultBlock from '../../components/result-block';
import ExchangeBlock from '../../components/exchange-block';

function ExchangeController({ rates, accounts, setAccounts }: OwnProps) {
  const {
    accountFrom,
    accountTo,
    accountToReplaceType,
    changeAccount,
    isSelectorOpen,
    transferResult,
    closeSelector,
    closeResult,
    ...exchangeBlockCallbacks
  } = useExchange(rates, accounts, setAccounts);

  if (!accountFrom || !accountTo) {
    return (
      <Loader />
    );
  }

  if (isSelectorOpen && accountToReplaceType) {
    return (
      <AccountSelector
        type={accountToReplaceType}
        accounts={accounts}
        closeSelector={closeSelector}
        selectAccount={changeAccount}
      />
    );
  }

  if (transferResult) {
    return (
      <ResultBlock
        result={transferResult}
        handleButtonClick={closeResult}
      />
    );
  }

  return (
    <ExchangeBlock
      accountFrom={accountFrom}
      accountTo={accountTo}
      {...exchangeBlockCallbacks}
    />
  );
}

export default ExchangeController;
