import React from 'react';
import { OwnProps } from './types';
import './button.scss';

function Button({ children, active, styleType, className, ...otherProps }: OwnProps) {
  return (
    <button
      {...otherProps}
      type="button"
      className={`button button_${styleType} ${active ? 'button_active' : ''} ${className || ''}`}
      disabled={!active}
    >
      {children}
    </button>
  );
}

export default Button;
