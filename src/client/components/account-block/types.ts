import { Account } from '../../hooks/useExchange/types';

export type AccountType = 'From' | 'To';

export type OwnProps = {
  type: AccountType;
  currentAccount: Account;
  otherAccount: Account;
  onInputChange: (value: string) => void;
  handleSelectorClick: () => void;
};
