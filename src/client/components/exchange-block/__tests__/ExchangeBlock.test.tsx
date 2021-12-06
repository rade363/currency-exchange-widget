import React from 'react';
import { create } from 'react-test-renderer';
import ExchangeBlock from '../ExchangeBlock';
import { Account } from '../../../hooks/useExchange/types';

describe('Exchange block', () => {
  const accountFrom: Account = {
    balance: 1137.42,
    change: '0.00',
    result: null,
    error: null,
    currency: {
      name: 'USD',
      sign: '$',
      rate: 0.753425,
    },
  };

  const accountTo: Account = {
    balance: 1137.42,
    change: '0.00',
    result: null,
    error: null,
    currency: {
      name: 'GBP',
      sign: '£',
      rate: 1.327273,
    },
  };

  test('Should match snapshot', () => {
    const mockCallBack = jest.fn();
    const block = create(
      <ExchangeBlock
        accountFrom={accountFrom}
        accountTo={accountTo}
        handleAccountFromInputChange={mockCallBack}
        handleAccountToInputChange={mockCallBack}
        swapAccounts={mockCallBack}
        chooseFromAccount={mockCallBack}
        chooseToAccount={mockCallBack}
        transferMoney={mockCallBack}
      />,
    );
    const tree = block.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
