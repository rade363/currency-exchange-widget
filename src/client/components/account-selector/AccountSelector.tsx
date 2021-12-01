import React from 'react';
import CurrencySign from '../currency-sign';
import { OwnProps } from './types';
import arrowDown from '../account-block/arrow.svg';
import './account-selector.scss';

function AccountSelector({ currency, className, ...otherButtonProps }: OwnProps) {
  return (
    <button
      {...otherButtonProps}
      className={`account-selector ${className || ''}`}
      type="button"
    >
      <CurrencySign
        className="account-selector__sign"
        sign={currency.sign}
      />
      <div className="account-selector__name">{currency.name}</div>
      <img
        className="account-selector__arrow"
        src={arrowDown}
        alt="arrow-down"
      />
    </button>
  );
}

export default AccountSelector;
