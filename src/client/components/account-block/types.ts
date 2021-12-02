import { Currency } from '../../utils/create-currency/types';
import { Nullable } from '../../../types';

export type Account = {
  balance: number;
  change: string;
  result: Nullable<string>;
  error: Nullable<string>;
  currency: Currency;
};

export type OwnProps = {
  type: 'From' | 'To';
  currentAccount: Account;
  otherAccount: Account;
  onInputChange: (value: string) => void;
};
