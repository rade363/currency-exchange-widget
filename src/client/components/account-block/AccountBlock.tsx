import React, { useCallback, ChangeEvent } from 'react';
import CurrencyLabel from '../currency-label';
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
    onInputChange(event.currentTarget.value);
  }, [onInputChange]);

  const handleBlur = useCallback(() => {
    if (change.indexOf('.') < 0) {
      const newNumber = Number(change).toFixed(2);
      onInputChange(newNumber);
      return;
    }

    const enteredValueArr = change.split('.');
    const [, decimal] = enteredValueArr;

    if (decimal.length === 2) {
      return;
    }

    onInputChange(Number(change).toFixed(2));
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
          type="number"
          step="0.01"
          placeholder="0.00"
          max="9999999.99"
          pattern={'^\\d*(\\.\\d{0,2})?$'}
          value={Number(change) === 0 ? '' : change}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="account-block__row">
        <div className="account-block__rate">
          {currency.sign}1 = {otherAccount.currency.sign}{currency.rate}
        </div>
        <div className={`account-block__result ${error ? 'account-block__result_error' : ''}`}>
          { setStatus(error, result) }
        </div>
      </div>
    </div>
  );
}

export default AccountBlock;
