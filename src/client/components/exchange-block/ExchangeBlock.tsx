import React from 'react';
import useExchange from '../../hooks/useExchange';
import AccountSelector from '../account-selector';
import AccountBlock from '../account-block';
import SwapButton from '../swap-button';
import Button from '../button';
import Loader from '../loader';
import { BUTTON_INACTIVE_TEXT } from '../../constants';
import { OwnProps } from './types';
import './exchange-block.scss';

function ExchangeBlock({ rates, accounts, setAccounts }: OwnProps) {
  const {
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
  } = useExchange(rates, accounts, setAccounts);

  if (!accountFrom || !accountTo) {
    return (
      <Loader />
    );
  }

  if (isSelectorOpen && accountToReplace && accountToReplaceType) {
    return (
      <AccountSelector
        accountToReplace={accountToReplace}
        type={accountToReplaceType}
        accounts={accounts}
        closeSelector={closeSelector}
      />
    );
  }

  return (
    <div className="exchange-block">
      <h1 className="exchange-block__title">
        Exchange {accountFrom.currency.name} to {accountTo.currency.name}
      </h1>
      <AccountBlock
        type="From"
        currentAccount={accountFrom}
        otherAccount={accountTo}
        onInputChange={handleAccountFromInputChange}
        handleSelectorClick={chooseFromAccount}
      />
      <SwapButton
        onClick={swapAccounts}
      />
      <AccountBlock
        type="To"
        currentAccount={accountTo}
        otherAccount={accountFrom}
        onInputChange={handleAccountToInputChange}
        handleSelectorClick={chooseToAccount}
      />
      <Button
        active={false}
        styleType="primary"
      >
        {BUTTON_INACTIVE_TEXT}
      </Button>
    </div>
  );
}

export default ExchangeBlock;
