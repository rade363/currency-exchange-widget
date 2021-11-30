import React, { useCallback, useState, ChangeEvent, useEffect } from 'react';
import AccountSelector from '../account-selector';
import { MAX_INPUT_VALUE } from '../../constants';
import { OwnProps } from './types';
import { Nullable } from '../../../types';
import './account-block.scss';

function AccountBlock({ type, currentAccount, otherAccount }: OwnProps) {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<Nullable<string>>(null);
  const [result, setResult] = useState<Nullable<string>>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;

    if (Number(newValue) > Number(MAX_INPUT_VALUE)) {
      setError(`Max value: ${MAX_INPUT_VALUE.length} digits`);
      return;
    }

    setAmount(newValue);
  }, []);

  const handleBlur = useCallback(() => {
    if (Number(amount) === 0) {
      setAmount('');
      return;
    }

    if (!amount.includes('.')) {
      setAmount(`${amount}.00`);
      return;
    }

    const enteredValueArr = amount.split('.');
    const [, decimal] = enteredValueArr;

    if (decimal.length === 2) {
      return;
    }

    setAmount(Number(amount).toFixed(2));
  }, [amount]);

  useEffect(() => {
    const amountNumber = Number(amount);
    if (amountNumber === 0) {
      setResult(null);
      setError(null);
      return;
    }

    const remaining = Number((currentAccount.balance - amountNumber).toFixed(2));

    if (remaining >= 0) {
      setResult(`Result: ${remaining}`);
      setError(null);
      return;
    }

    setError(`Insufficient funds: ${remaining}`);
  }, [amount, currentAccount.balance]);

  const currencyRate = Number(otherAccount.currency.rate / currentAccount.currency.rate).toFixed(2);

  return (
    <div className="account-block margin_tb_s-5">
      <div className="account-block__row">
        <div className="account-block__type">{type}</div>
        <div className="account-block__balance">Balance: {currentAccount.balance}</div>
      </div>
      <div className="account-block__row">
        <AccountSelector
          className="account-block__selector"
          currency={currentAccount.currency}
        />
        <input
          className="account-block__input"
          type="number"
          step="0.01"
          placeholder="0.00"
          max="9999999.99"
          pattern={'^\\d*(\\.\\d{0,2})?$'}
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="account-block__row">
        <div className="account-block__rate">
          {currentAccount.currency.sign}1 = {otherAccount.currency.sign}{currencyRate}
        </div>
        <div className={`account-block__result ${error ? 'account-block__result_error' : ''}`}>
          { error ?? result }
        </div>
      </div>
    </div>
  );
}

export default AccountBlock;
