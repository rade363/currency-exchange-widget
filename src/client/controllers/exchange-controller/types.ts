import { Dispatch, SetStateAction } from 'react';
import { RatesTable } from '../../utils/calculate-rates/types';
import { UserAccount } from '../../components/app/types';

export type SetAccountsCallback = Dispatch<SetStateAction<UserAccount[]>>;

export type OwnProps = {
  rates: RatesTable;
  accounts: UserAccount[];
  setAccounts: SetAccountsCallback;
};
