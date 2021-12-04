import { AccountType } from '../account-block/types';
import { UserAccount } from '../app/types';
import { CurrencyName } from '../../utils/create-currency/types';

export type OwnProps = {
  type: AccountType;
  accounts: UserAccount[];
  closeSelector: () => void;
  selectAccount: (name: CurrencyName) => void;
};
