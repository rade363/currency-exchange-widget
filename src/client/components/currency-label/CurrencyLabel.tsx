import React from 'react';
import CurrencySign from '../currency-sign';
import { OwnProps } from './types';
import arrowDown from './arrow.svg';
import './currency-label.scss';

function CurrencyLabel({ currency, showArrow, className, ...otherButtonProps }: OwnProps) {
  return (
    <button
      {...otherButtonProps}
      className={`currency-label ${className || ''}`}
      type="button"
    >
      <CurrencySign
        className="currency-label__sign"
        sign={currency.sign}
      />
      <div className="currency-label__name">{currency.name}</div>
      { showArrow && (
        <img
          className="currency-label__arrow"
          src={arrowDown}
          alt="arrow-down"
        />
      )}
    </button>
  );
}

export default CurrencyLabel;
