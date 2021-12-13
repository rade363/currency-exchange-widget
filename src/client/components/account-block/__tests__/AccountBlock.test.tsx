import React, { useCallback, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import validateValue from '../../../utils/validate-value';
import AccountBlock from '../index';
import { Account } from '../../../hooks/useExchange/types';
import { RatesTable } from '../../../utils/calculate-rates/types';
import { DECIMAL_ACCURACY } from '../../../constants';

const sampleRatesTable: RatesTable = {
  usdToGbp: 0.753425,
  usdToEur: 0.885115,
  eurToGbp: 0.851217,
  eurToUsd: 1.129797,
  gbpToEur: 1.174789,
  gbpToUsd: 1.327273,
};
const initialFromAccount: Account = {
  balance: 1137.42,
  change: '0.00',
  result: null,
  error: null,
  currency: {
    name: 'USD',
    sign: '$',
    rate: sampleRatesTable.usdToEur,
  },
};
const initialToAccount: Account = {
  balance: 10,
  change: '0.00',
  result: null,
  error: null,
  currency: {
    name: 'EUR',
    sign: '€',
    rate: sampleRatesTable.eurToUsd,
  },
};

function TestWrapperComponent() {
  const [accountFrom, setAccountFrom] = useState<Account>(initialFromAccount);
  const [accountTo, setAccountTo] = useState<Account>(initialToAccount);
  const mockedCallBack = jest.fn();

  const updateAccounts = useCallback((value: string) => {
    const newValue = Number(value);

    setAccountFrom(prevAccountFrom => ({
      ...prevAccountFrom,
      change: value,
      result: newValue === 0 ? null : (prevAccountFrom.balance - newValue).toFixed(DECIMAL_ACCURACY),
      error: validateValue(value, prevAccountFrom.balance),
    }));

    setAccountTo(prevAccountTo => {
      const change = (newValue * accountFrom.currency.rate).toFixed(DECIMAL_ACCURACY);
      return {
        ...prevAccountTo,
        change,
        result: newValue === 0 ? null : (prevAccountTo.balance + Number(change)).toFixed(DECIMAL_ACCURACY),
      };
    });
  }, [accountFrom.currency.rate]);

  return (
    <AccountBlock
      type="From"
      currentAccount={accountFrom}
      otherAccount={accountTo}
      onInputChange={updateAccounts}
      handleSelectorClick={mockedCallBack}
    />
  );
}

const setup = () => {
  const utils = render(<TestWrapperComponent />);
  const input = utils.getByPlaceholderText('0.00') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe('Account Block', () => {
  it('should be initialized with an empty value (empty string)', () => {
    const { input } = setup();
    expect(input.value).toBe('');
  });

  it('should not accept anything but integers and decimals', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'text' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '$' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: ' ' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');

    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '42.0567' } });
    expect(input.value).toBe('42.0567');

    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '..' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '.422' } });
    expect(input.value).toBe('.422');
  });

  it('should display nothing in order to show placeholder in case the value is 0', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');

    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: '0.00' } });
    expect(input.value).toBe('');
  });

  it('should convert integer to decimal on blur event', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');

    fireEvent.blur(input);
    expect(input.value).toBe('42.00');
  });

  it('should round the decimal accuracy to the required one', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '42.12345678' } });
    expect(input.value).toBe('42.12345678');

    fireEvent.blur(input);
    expect(input.value).toBe('42.12');
    expect(input.value.split('.')[1].length).toBe(DECIMAL_ACCURACY);
  });

  it('should not change the value in case the decimal accuracy is valid', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '42.69' } });
    expect(input.value).toBe('42.69');

    fireEvent.blur(input);
    expect(input.value).toBe('42.69');
    expect(input.value.split('.')[1].length).toBe(DECIMAL_ACCURACY);
  });

  it('should render the account block without input value, result and error', () => {
    const mockedCallBack = jest.fn();

    const block = create(
      <AccountBlock
        type="From"
        currentAccount={initialFromAccount}
        otherAccount={initialToAccount}
        onInputChange={mockedCallBack}
        handleSelectorClick={mockedCallBack}
      />,
    );

    const tree = block.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the account block with result in case of valid input value', () => {
    const mockedCallBack = jest.fn();
    const modifiedAccountFrom: Account = {
      ...initialFromAccount,
      change: '200',
      result: '937.42',
    };

    const block = create(
      <AccountBlock
        type="From"
        currentAccount={modifiedAccountFrom}
        otherAccount={initialToAccount}
        onInputChange={mockedCallBack}
        handleSelectorClick={mockedCallBack}
      />,
    );

    const tree = block.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the account block with error in case of invalid input value', () => {
    const mockedCallBack = jest.fn();
    const modifiedAccountFrom: Account = {
      ...initialFromAccount,
      change: '2000',
      result: '-862.58',
      error: validateValue('2000', 1137.42),
    };

    const block = create(
      <AccountBlock
        type="From"
        currentAccount={modifiedAccountFrom}
        otherAccount={initialToAccount}
        onInputChange={mockedCallBack}
        handleSelectorClick={mockedCallBack}
      />,
    );

    const tree = block.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the account block with maximum input value error', () => {
    const mockedCallBack = jest.fn();
    const modifiedAccountFrom: Account = {
      ...initialFromAccount,
      change: '100000000',
      result: '-99998862,58',
      error: validateValue('100000000', 1137.42),
    };

    const block = create(
      <AccountBlock
        type="From"
        currentAccount={modifiedAccountFrom}
        otherAccount={initialToAccount}
        onInputChange={mockedCallBack}
        handleSelectorClick={mockedCallBack}
      />,
    );

    const tree = block.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
