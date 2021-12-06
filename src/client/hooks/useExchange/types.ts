import { Nullable } from '../../../types';
import { CurrencyWithRate } from '../../utils/create-currency/types';

export type Account = {
  balance: number;
  change: string;
  result: Nullable<string>;
  error: Nullable<string>;
  currency: CurrencyWithRate;
};
