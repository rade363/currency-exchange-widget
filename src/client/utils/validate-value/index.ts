import { Nullable } from '../../../types';
import { DECIMAL_ACCURACY, MAX_INPUT_VALUE } from '../../constants';

export default function validateValue(value: string, balance: number): Nullable<string> {
  if (Number(value) > Number(MAX_INPUT_VALUE)) {
    return `Max value: ${MAX_INPUT_VALUE.length} digits`;
  }

  const remaining = balance - Number(value);

  if (remaining < 0) {
    return `Insufficient funds: ${remaining.toFixed(DECIMAL_ACCURACY)}`;
  }

  return null;
}
