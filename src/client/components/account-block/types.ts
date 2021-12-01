import { Currency } from '../../utils/create-currency/types';

export type Account = {
  balance: number;
  currency: Currency;
};

export type OwnProps = {
  type: 'From' | 'To';
  currentAccount: Account;
  otherAccount: Account;
};
