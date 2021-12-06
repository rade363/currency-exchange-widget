import React from 'react';
import { OwnProps } from './types';
import cross from './cross.svg';
import './close-button.scss';

function CloseButton({ className, ...otherButtonProps }: OwnProps) {
  return (
    <button
      {...otherButtonProps}
      className={`close-button ${className || ''}`}
      type="button"
    >
      <img
        className="close-button__icon"
        src={cross}
        alt="close"
        title="Close"
      />
    </button>
  );
}

export default CloseButton;
