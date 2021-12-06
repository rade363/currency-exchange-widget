import React from 'react';
import { OwnProps } from './types';
import Checkmark from '../checkmark';
import Button from '../button';
import './result-block.scss';

function ResultBlock({ result, handleButtonClick }: OwnProps) {
  return (
    <div className="result">
      <div className="result__row">
        <Checkmark />
      </div>
      <div className="result__row">
        <div className="result__details margin_tb_s-5">{result}</div>
      </div>
      <div className="result__row">
        <Button
          className="result__button-close"
          styleType="primary"
          active
          onClick={handleButtonClick}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default ResultBlock;
