import { Account } from '../../hooks/useExchange/types';
import { AccountType } from '../account-block/types';
import { UserAccount } from '../app/types';

export type OwnProps = {
  type: AccountType;
  accountToReplace: Account;
  accounts: UserAccount[];
  closeSelector: () => void;
};
