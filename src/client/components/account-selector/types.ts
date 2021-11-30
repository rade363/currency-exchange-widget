import { ButtonHTMLAttributes } from 'react';
import { Currency } from '../account-block/types';

export type OwnProps = {
  currency: Currency;
} & ButtonHTMLAttributes<HTMLButtonElement>;
