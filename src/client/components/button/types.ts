import { ButtonHTMLAttributes } from 'react';

export type OwnProps = {
  active: boolean;
  styleType: 'primary' | 'danger';
} & ButtonHTMLAttributes<HTMLButtonElement>;
