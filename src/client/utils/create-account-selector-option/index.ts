import { UserAccount } from '../../components/app/types';
import { SelectableAccount } from './types';
import { currencies } from '../create-currency/currencies';

export default function createAccountSelectorOption({ balance, name }: UserAccount): SelectableAccount {
  const relevantCurrency = currencies.find(currency => currency.name === name);
  return {
    balance,
    currency: relevantCurrency!,
  };
}
