import React from 'react';
import { OwnProps } from './types';
import CurrencyLabel from '../currency-label';
import CloseButton from '../close-button';
import Search from '../search';
import './account-selector.scss';
import useSearchFilter from '../../hooks/useSearchFilter';

function AccountSelector({ type, accountToReplace, accounts, closeSelector }: OwnProps) {
  const {
    searchKey,
    filteredAccounts,
    handleSearchInput,
  } = useSearchFilter(accounts);
  return (
    <div className="account-selector">
      <div className="account-selector__row">
        <h1 className="account-selector__title">{type} account</h1>
        <div className="account-selector__close-button">
          <CloseButton onClick={closeSelector} />
        </div>
      </div>
      <Search
        className="account-selector__search"
        placeholder="Search account by name"
        value={searchKey}
        onChange={handleSearchInput}
      />
      <ul className="account-selector__list">
        {filteredAccounts.map(account => (
          <li
            className="account-selector__item"
            key={account.currency.name}
          >
            <div className="account-item">
              <CurrencyLabel
                className="account-item__currency"
                currency={account.currency}
                showArrow={false}
              />
              <div
                className="account-item__balance"
              >
                {account.balance}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountSelector;
