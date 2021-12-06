import { ButtonHTMLAttributes } from 'react';
import { Currency } from '../../utils/create-currency/types';

export type OwnProps = {
  currency: Currency;
  showArrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
