import React from 'react';
import AccountBlock from '../account-block';
import SwapButton from '../swap-button';
import Button from '../button';
import { BUTTON_INACTIVE_TEXT } from '../../constants';
import { CurrencySignsLib, CurrencyNamesEnum, Currency } from '../account-block/types';
import './app.scss';

export default function App() {
  const currencySignsLib: CurrencySignsLib = {
    [CurrencyNamesEnum.USD]: '$',
    [CurrencyNamesEnum.EUR]: '€',
    [CurrencyNamesEnum.GBP]: '£',
  };

  const currencyUsd: Currency = {
    name: CurrencyNamesEnum.USD,
    sign: currencySignsLib[CurrencyNamesEnum.USD],
    rate: 1,
  };

  // const currencyEur: Currency = {
  //   name: CurrencyNamesEnum.EUR,
  //   sign: currencySignsLib[CurrencyNamesEnum.USD],
  //   rate: 0.89,
  // };

  const currencyGbp: Currency = {
    name: CurrencyNamesEnum.GBP,
    sign: currencySignsLib[CurrencyNamesEnum.GBP],
    rate: 0.75,
  };

  const accountFrom = {
    balance: 1137.42,
    currency: currencyUsd,
  };
  const accountTo = {
    balance: 2000.00,
    currency: currencyGbp,
  };

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">Exchange {accountFrom.currency.name} to {accountTo.currency.name}</h1>
        <AccountBlock
          type="From"
          currentAccount={accountFrom}
          otherAccount={accountTo}
        />
        <SwapButton
          onClick={() => console.log('Clicked')}
        />
        <AccountBlock
          type="To"
          currentAccount={accountTo}
          otherAccount={accountFrom}
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
