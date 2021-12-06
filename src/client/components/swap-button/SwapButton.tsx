import React from 'react';
import { OwnProps } from './types';
import './swap-button.scss';

function SwapButton({ className, ...otherButtonProps }: OwnProps) {
  return (
    <button
      {...otherButtonProps}
      className={`swap-button ${className || ''}`}
      type="button"
    >
      <span className="swap-button__arrows">↑↓</span>
    </button>
  );
}

export default SwapButton;
