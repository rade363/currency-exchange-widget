import React from 'react';
import AccountBlock from '../account-block';
import SwapButton from '../swap-button';
import Button from '../button';
import Loader from '../loader';
import useAccounts from '../../hooks/useAccounts';
import { BUTTON_INACTIVE_TEXT } from '../../constants';
import './app.scss';

import user from './user.json';
import { User } from '../../hooks/useAccounts/types';

export default function App() {
  const {
    areRatesCollected,
    accountFrom,
    accountTo,
    handleAccountFromInputChange,
    handleAccountToInputChange,
    swapAccounts,
  } = useAccounts(user as User);

  if (!areRatesCollected || !accountFrom || !accountTo) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">
          Exchange {accountFrom.currency.name} to {accountTo.currency.name}
        </h1>
        <AccountBlock
          type="From"
          currentAccount={accountFrom}
          otherAccount={accountTo}
          onInputChange={handleAccountFromInputChange}
        />
        <SwapButton
          onClick={swapAccounts}
        />
        <AccountBlock
          type="To"
          currentAccount={accountTo}
          otherAccount={accountFrom}
          onInputChange={handleAccountToInputChange}
        />
        <Button
          active={false}
          styleType="primary"
        >
          {BUTTON_INACTIVE_TEXT}
        </Button>
      </div>
    </div>
  );
}
