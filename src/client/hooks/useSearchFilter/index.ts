import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { SelectableAccount } from '../../utils/create-account-selector-option/types';
import { UserAccount } from '../../components/app/types';
import createAccountSelectorOption from '../../utils/create-account-selector-option';

const useSearchFilter = (accounts: UserAccount[]) => {
  const [allAccounts, setAllAccounts] = useState<SelectableAccount[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [filteredAccounts, setFilteredAccounts] = useState<SelectableAccount[]>([]);

  useEffect(() => {
    if (allAccounts.length < 1 && accounts.length > 1) {
      setAllAccounts(accounts.map(createAccountSelectorOption));
    }
  }, [allAccounts, accounts]);

  useEffect(() => {
    const remainingAccounts = allAccounts.filter(account => {
      const name = account.currency.name.toLowerCase();
      return name.includes(searchKey.toLowerCase());
    });
    setFilteredAccounts(remainingAccounts);
  }, [allAccounts, searchKey]);

  const handleSearchInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  }, []);

  return {
    searchKey,
    filteredAccounts,
    handleSearchInput,
  };
};

export default useSearchFilter;
