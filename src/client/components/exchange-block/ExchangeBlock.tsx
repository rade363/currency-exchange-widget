import React from 'react';
import AccountBlock from '../account-block';
import SwapButton from '../swap-button';
import Button from '../button';
import setButtonText from '../../utils/set-button-text';
import { OwnProps } from './types';
import './exchange-block.scss';

function ExchangeBlock(props: OwnProps) {
  const {
    accountFrom,
    accountTo,
    handleAccountFromInputChange,
    handleAccountToInputChange,
    swapAccounts,
    chooseFromAccount,
    chooseToAccount,
    transferMoney,
  } = props;
  const isErrorPresent = accountFrom.error !== null || accountTo.error !== null;
  const isButtonActive = Number(accountFrom.change) !== 0 && Number(accountTo.change) !== 0;

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
        active={isButtonActive}
        styleType={isErrorPresent ? 'danger' : 'primary'}
        disabled={isErrorPresent}
        onClick={() => transferMoney(isButtonActive, isErrorPresent)}
      >
        {setButtonText(isErrorPresent, isButtonActive, accountFrom.currency.name, accountTo.currency.name)}
      </Button>
    </div>
  );
}

export default ExchangeBlock;
