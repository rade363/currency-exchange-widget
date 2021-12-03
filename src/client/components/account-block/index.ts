import { memo } from 'react';

import AccountBlock from './AccountBlock';
import { OwnProps } from './types';
import { Account } from '../../hooks/useExchange/types';

function areAccountsEqual(prevAccountState: Account, nextAccountState: Account): boolean {
  if (prevAccountState.balance !== nextAccountState.balance) {
    return false;
  }

  if (prevAccountState.change !== nextAccountState.change) {
    return false;
  }

  if (prevAccountState.result !== nextAccountState.result) {
    return false;
  }

  if (prevAccountState.error !== nextAccountState.error) {
    return false;
  }

  if (prevAccountState.currency.name !== nextAccountState.currency.name) {
    return false;
  }

  if (prevAccountState.currency.rate !== nextAccountState.currency.rate) {
    return false;
  }

  return true;
}

function areEqual(prevProps: OwnProps, nextProps: OwnProps): boolean {
  if (prevProps.type !== nextProps.type) {
    return false;
  }

  if (!areAccountsEqual(prevProps.currentAccount, nextProps.currentAccount)) {
    return false;
  }

  if (!areAccountsEqual(prevProps.otherAccount, nextProps.otherAccount)) {
    return false;
  }

  return true;
}

export default memo<OwnProps>(AccountBlock, areEqual);
