import { Account } from '../../hooks/useExchange/types';

export type OwnProps = {
  accountFrom: Account;
  accountTo: Account;
  handleAccountFromInputChange: (value: string) => void;
  handleAccountToInputChange: (value: string) => void;
  swapAccounts: () => void;
  chooseFromAccount: () => void;
  chooseToAccount: () => void;
  transferMoney: (isButtonActive: boolean, isErrorPresent: boolean) => void;
};
