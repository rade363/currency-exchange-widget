import React from 'react';
import { OwnProps } from './types';
import './currency-sign.scss';

function CurrencySign({ sign, className }: OwnProps) {
  return (
    <div className={`currency-sign ${className || ''}`}>{sign}</div>
  );
}

export default CurrencySign;
