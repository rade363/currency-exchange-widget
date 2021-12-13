import { renderHook, act } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import useSearchFilter from '../index';
import { UserAccount } from '../../../components/app/types';
import { SelectableAccount } from '../../../utils/create-account-selector-option/types';

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

const desiredInitialAccounts: SelectableAccount[] = [
  {
    balance: 1137.42,
    currency: {
      name: 'USD',
      sign: '$',
    },
  },
  {
    balance: 10,
    currency: {
      name: 'EUR',
      sign: '€',
    },
  },
  {
    balance: 2000,
    currency: {
      name: 'GBP',
      sign: '£',
    },
  },
];

const desiredFilteredAccounts: SelectableAccount[] = [
  {
    balance: 2000,
    currency: {
      name: 'GBP',
      sign: '£',
    },
  },
];

const sampleSearchInputChangeEvent = {
  target: {
    value: 'GBP',
  },
};

const resetSearchInputChangeEvent = {
  target: {
    value: '',
  },
};

const invalidInputChangeEvent = {
  target: {
    value: 'random-stuff',
  },
};

describe('useSearchFilter hook', () => {
  it('should initialize filterable accounts based on the provided userAccounts', () => {
    const { result } = renderHook(() => useSearchFilter(sampleUserAccounts));

    expect(result.current.searchKey).toBe('');
    expect(result.current.filteredAccounts).toMatchObject(desiredInitialAccounts);
  });

  it('should filter accounts based on the search input', () => {
    const { result } = renderHook(() => useSearchFilter(sampleUserAccounts));

    act(() => {
      result.current.handleSearchInput(sampleSearchInputChangeEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchKey).toBe('GBP');
    expect(result.current.filteredAccounts).toMatchObject(desiredFilteredAccounts);
  });

  it('should reset accounts to initial when the search input is cleared', () => {
    const { result } = renderHook(() => useSearchFilter(sampleUserAccounts));

    act(() => {
      result.current.handleSearchInput(sampleSearchInputChangeEvent as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSearchInput(resetSearchInputChangeEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchKey).toBe('');
    expect(result.current.filteredAccounts).toMatchObject(desiredInitialAccounts);
  });

  it('should provide no accounts when there is no match based on the invalid input', () => {
    const { result } = renderHook(() => useSearchFilter(sampleUserAccounts));

    act(() => {
      result.current.handleSearchInput(invalidInputChangeEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchKey).toBe('random-stuff');
    expect(result.current.filteredAccounts).toMatchObject([]);
  });
});
