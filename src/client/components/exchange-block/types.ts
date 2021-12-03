import { RatesTable } from '../../utils/calculate-rates/types';
import { UserAccount } from '../app/types';

export type SetAccountsCallback = (accounts: UserAccount[]) => void;

export type OwnProps = {
  rates: RatesTable;
  accounts: UserAccount[];
  setAccounts: SetAccountsCallback;
};
