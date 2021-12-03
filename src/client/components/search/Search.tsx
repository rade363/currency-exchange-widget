import React from 'react';
import { OwnProps } from './types';
import './search.scss';
import magnifier from './magnifier.svg';

function Search({ className, ...inputProps }: OwnProps) {
  return (
    <div className={`search ${className || ''}`}>
      <input
        {...inputProps}
        className="search__input"
        type="text"
        style={{ backgroundImage: `url(${magnifier})` }}
      />
    </div>
  );
}

export default Search;
