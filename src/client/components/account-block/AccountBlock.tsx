import React, { useCallback, ChangeEvent } from 'react';
import CurrencyLabel from '../currency-label';
import { DECIMAL_ACCURACY } from '../../constants';
import { OwnProps } from './types';
import { Nullable } from '../../../types';
import './account-block.scss';

function setStatus(error: Nullable<string>, result: Nullable<string>): string {
  if (error) {
    return error;
  }

  return result === null ? '' : `Result: ${result}`;
}

function AccountBlock({ type, currentAccount, otherAccount, onInputChange, handleSelectorClick }: OwnProps) {
  const { balance, change, result, error, currency } = currentAccount;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (/^\d*\.?\d*$/gmi.test(newValue)) {
      onInputChange(newValue);
    }
  }, [onInputChange]);

  const handleBlur = useCallback(() => {
    if (change.indexOf('.') < 0) {
      const newNumber = Number(change).toFixed(DECIMAL_ACCURACY);
      onInputChange(newNumber);
      return;
    }

    const enteredValueArr = change.split('.');
    const [, decimal] = enteredValueArr;

    if (decimal.length === 2) {
      return;
    }

    onInputChange(Number(change).toFixed(DECIMAL_ACCURACY));
  }, [change, onInputChange]);

  return (
    <div className="account-block margin_tb_s-5">
      <div className="account-block__row">
        <div className="account-block__type">{type}</div>
        <div className="account-block__balance">Balance: {balance}</div>
      </div>
      <div className="account-block__row">
        <CurrencyLabel
          className="account-block__selector"
          currency={currency}
          onClick={handleSelectorClick}
          showArrow
        />
        <input
          className="account-block__input"
          type="text"
          placeholder="0.00"
          value={Number(change) === 0 ? '' : change}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="account-block__row">
        <div className="account-block__rate">
          {currency.sign}1 = {otherAccount.currency.sign}{currency.rate.toFixed(DECIMAL_ACCURACY)}
        </div>
        <div className={`account-block__result ${error ? 'account-block__result_error' : ''}`}>
          { setStatus(error, result) }
        </div>
      </div>
    </div>
  );
}

export default AccountBlock;
