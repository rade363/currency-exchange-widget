import { CurrencyName } from '../../utils/create-currency/types';

export type User = {
  accounts: UserAccount[];
};

export type UserAccount = {
  balance: number;
  name: CurrencyName;
};
