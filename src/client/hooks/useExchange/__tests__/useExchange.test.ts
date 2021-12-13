import { renderHook, act } from '@testing-library/react-hooks';
import useExchange from '../index';
import { RatesTable } from '../../../utils/calculate-rates/types';
import { UserAccount } from '../../../components/app/types';
import { Account } from '../types';

const sampleRatesTable: RatesTable = {
  usdToGbp: 0.753425,
  usdToEur: 0.885115,
  eurToGbp: 0.851217,
  eurToUsd: 1.129797,
  gbpToEur: 1.174789,
  gbpToUsd: 1.327273,
};
const sampleUserAccounts: UserAccount[] = [
  {
    name: 'USD',
    balance: 1137.42,
  },
  {
    name: 'EUR',
    balance: 10.00,
  },
  {
    name: 'GBP',
    balance: 2000.00,
  },
];
const mockedSetAccounts = jest.fn();

describe('useExchange hook', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    const [firstAccount, secondAccount] = sampleUserAccounts;
    const expectedFromAccount: Account = {
      balance: firstAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };
    const expectedToAccount: Account = {
      balance: secondAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };

    expect(result.current.isSelectorOpen).toBe(false);
    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
    expect(result.current.accountToReplaceType).toBeNull();
    expect(result.current.transferResult).toBeNull();
  });

  it('should update both accounts change and result values on accountFrom valid input change', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.handleAccountFromInputChange('200');
    });

    expect(result.current.accountFrom!.change).toBe('200');
    expect(result.current.accountFrom!.result).toBe('937.42');
    expect(result.current.accountFrom!.error).toBeNull();

    expect(result.current.accountTo!.change).toBe('177.02');
    expect(result.current.accountTo!.result).toBe('187.02');
    expect(result.current.accountTo!.error).toBeNull();
  });

  it('should update both accounts change and result values on accountTo valid input change', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.handleAccountToInputChange('9.99');
    });

    expect(result.current.accountFrom!.change).toBe('11.29');
    expect(result.current.accountFrom!.result).toBe('1126.13');
    expect(result.current.accountFrom!.error).toBeNull();

    expect(result.current.accountTo!.change).toBe('9.99');
    expect(result.current.accountTo!.result).toBe('19.99');
    expect(result.current.accountTo!.error).toBeNull();
  });

  it(
    'should produce an error in case entered accountFrom change input value exceeds account from balance',
    () => {
      const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

      act(() => {
        result.current.handleAccountFromInputChange('2000');
      });

      expect(result.current.accountFrom!.change).toBe('2000');
      expect(result.current.accountFrom!.result).toBe('-862.58');
      expect(result.current.accountFrom!.error).toBe('Insufficient funds: -862.58');

      expect(result.current.accountTo!.change).toBe('1770.23');
      expect(result.current.accountTo!.result).toBe('1780.23');
      expect(result.current.accountTo!.error).toBeNull();
    },
  );

  it(
    'should produce an error in case entered accountTo change input value exceeds account from balance',
    () => {
      const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

      act(() => {
        result.current.handleAccountToInputChange('2000');
      });

      expect(result.current.accountFrom!.change).toBe('2259.59');
      expect(result.current.accountFrom!.result).toBe('-1122.17');
      expect(result.current.accountFrom!.error).toBe('Insufficient funds: -1122.17');

      expect(result.current.accountTo!.change).toBe('2000');
      expect(result.current.accountTo!.result).toBe('2010.00');
      expect(result.current.accountTo!.error).toBeNull();
    },
  );

  it('should swap accounts, reset result and keep change value', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    const [firstAccount, secondAccount] = sampleUserAccounts;

    act(() => {
      result.current.handleAccountFromInputChange('200');
    });

    const initialFromAccount: Account = {
      balance: firstAccount.balance,
      change: '200',
      result: '937.42',
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };
    const initialToAccount: Account = {
      balance: secondAccount.balance,
      change: '177.02',
      result: '187.02',
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };

    expect(result.current.accountFrom).toMatchObject(initialFromAccount);
    expect(result.current.accountTo).toMatchObject(initialToAccount);

    act(() => {
      result.current.swapAccounts();
    });

    const swappedFromAccount: Account = {
      balance: secondAccount.balance,
      change: '177.02',
      result: '-167.02',
      error: 'Insufficient funds: -167.02',
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };
    const swappedToAccount: Account = {
      balance: firstAccount.balance,
      change: '200',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };

    expect(result.current.accountFrom).toMatchObject(swappedFromAccount);
    expect(result.current.accountTo).toMatchObject(swappedToAccount);

    act(() => {
      result.current.swapAccounts();
    });

    const resultToAccount: Account = {
      ...initialToAccount,
      result: null,
    };

    expect(result.current.accountFrom).toMatchObject(initialFromAccount);
    expect(result.current.accountTo).toMatchObject(resultToAccount);
  });

  it('should change selector status and account to replace type on any account change callback', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseFromAccount();
    });

    expect(result.current.isSelectorOpen).toBe(true);
    expect(result.current.accountToReplaceType).toBe('From');

    act(() => {
      result.current.closeSelector();
    });

    expect(result.current.isSelectorOpen).toBe(false);

    act(() => {
      result.current.chooseToAccount();
    });

    expect(result.current.isSelectorOpen).toBe(true);
    expect(result.current.accountToReplaceType).toBe('To');
  });

  it(
    'should set selector status to closed when the close selector callback is executed or when account is changed',
    () => {
      const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

      expect(result.current.isSelectorOpen).toBe(false);

      act(() => {
        result.current.chooseFromAccount();
      });

      expect(result.current.isSelectorOpen).toBe(true);

      act(() => {
        result.current.closeSelector();
      });

      expect(result.current.isSelectorOpen).toBe(false);

      act(() => {
        result.current.chooseToAccount();
      });

      expect(result.current.isSelectorOpen).toBe(true);

      act(() => {
        result.current.closeSelector();
      });

      expect(result.current.isSelectorOpen).toBe(false);

      act(() => {
        result.current.chooseFromAccount();
      });

      expect(result.current.isSelectorOpen).toBe(true);

      act(() => {
        result.current.changeAccount('GBP')();
      });

      expect(result.current.isSelectorOpen).toBe(false);

      act(() => {
        result.current.chooseToAccount();
      });

      expect(result.current.isSelectorOpen).toBe(true);

      act(() => {
        result.current.changeAccount('EUR')();
      });

      expect(result.current.isSelectorOpen).toBe(false);
    },
  );

  it('should do nothing in terms of accounts in case the same account is selected again', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseFromAccount();
    });

    act(() => {
      result.current.changeAccount('USD')();
    });

    const [firstAccount, secondAccount] = sampleUserAccounts;
    const expectedFromAccount: Account = {
      balance: firstAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };
    const expectedToAccount: Account = {
      balance: secondAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);

    act(() => {
      result.current.chooseToAccount();
    });

    act(() => {
      result.current.changeAccount('EUR')();
    });

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should swap accounts in case the second account name is selected for the first account', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseFromAccount();
    });

    act(() => {
      result.current.changeAccount('EUR')();
    });

    const [firstAccount, secondAccount] = sampleUserAccounts;
    const expectedFromAccount: Account = {
      balance: secondAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };
    const expectedToAccount: Account = {
      balance: firstAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should swap accounts in case the first account name is selected for the second account', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseToAccount();
    });

    act(() => {
      result.current.changeAccount('USD')();
    });

    const [firstAccount, secondAccount] = sampleUserAccounts;
    const expectedFromAccount: Account = {
      balance: secondAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };
    const expectedToAccount: Account = {
      balance: firstAccount.balance,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should select valid new from account when a relevant currency is selected for it', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseFromAccount();
    });

    act(() => {
      result.current.changeAccount('GBP')();
    });

    const expectedFromAccount: Account = {
      balance: 2000.00,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'GBP',
        sign: '£',
        rate: sampleRatesTable.gbpToEur,
      },
    };
    const expectedToAccount: Account = {
      balance: 10.00,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToGbp,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should select valid new to account when a relevant currency is selected for it', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.chooseToAccount();
    });

    act(() => {
      result.current.changeAccount('GBP')();
    });

    const expectedFromAccount: Account = {
      balance: 1137.42,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToGbp,
      },
    };
    const expectedToAccount: Account = {
      balance: 2000.00,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'GBP',
        sign: '£',
        rate: sampleRatesTable.gbpToUsd,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should reset change and remaining values when account is changed', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.handleAccountFromInputChange('200');
    });

    const [firstAccount, secondAccount] = sampleUserAccounts;
    const changedInitialAccountFrom: Account = {
      balance: firstAccount.balance,
      change: '200',
      result: '937.42',
      error: null,
      currency: {
        name: 'USD',
        sign: '$',
        rate: sampleRatesTable.usdToEur,
      },
    };
    const changedInitialAccountTo: Account = {
      balance: secondAccount.balance,
      change: '177.02',
      result: '187.02',
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToUsd,
      },
    };

    expect(result.current.accountFrom).toMatchObject(changedInitialAccountFrom);
    expect(result.current.accountTo).toMatchObject(changedInitialAccountTo);

    act(() => {
      result.current.chooseFromAccount();
    });

    act(() => {
      result.current.changeAccount('GBP')();
    });

    const expectedFromAccount: Account = {
      balance: 2000.00,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'GBP',
        sign: '£',
        rate: sampleRatesTable.gbpToEur,
      },
    };
    const expectedToAccount: Account = {
      balance: 10.00,
      change: '0.00',
      result: null,
      error: null,
      currency: {
        name: 'EUR',
        sign: '€',
        rate: sampleRatesTable.eurToGbp,
      },
    };

    expect(result.current.accountFrom).toMatchObject(expectedFromAccount);
    expect(result.current.accountTo).toMatchObject(expectedToAccount);
  });

  it('should execute transaction between accounts and temporarily show results', async () => {
    const {
      result,
      waitForNextUpdate,
    } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.handleAccountFromInputChange('173.45');
    });

    act(() => {
      result.current.transferMoney(true, false);
    });

    expect(result.current.transferResult).toBe('You exchanged $173.45 to €153.52');

    expect(result.current.accountFrom!.balance).toBe(963.97);
    expect(result.current.accountFrom!.change).toBe('0.00');
    expect(result.current.accountFrom!.result).toBeNull();

    expect(result.current.accountTo!.balance).toBe(163.52);
    expect(result.current.accountTo!.change).toBe('0.00');
    expect(result.current.accountTo!.result).toBeNull();

    await waitForNextUpdate({
      timeout: 4000,
    });

    expect(result.current.transferResult).toBeNull();
  });

  it('should close results once the close results callback is fired', () => {
    const { result } = renderHook(() => useExchange(sampleRatesTable, sampleUserAccounts, mockedSetAccounts));

    act(() => {
      result.current.handleAccountFromInputChange('173.45');
    });

    act(() => {
      result.current.transferMoney(true, false);
    });

    expect(result.current.transferResult).toBe('You exchanged $173.45 to €153.52');

    act(() => {
      result.current.closeResult();
    });

    expect(result.current.transferResult).toBeNull();
  });
});
