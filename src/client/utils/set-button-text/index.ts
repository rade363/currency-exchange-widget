import { BUTTON_DANGER_TEXT, BUTTON_INACTIVE_TEXT } from '../../constants';

function setButtonText(isError: boolean, isButtonActive: boolean, fromCurrency: string, toCurrency: string): string {
  if (isError) {
    return BUTTON_DANGER_TEXT;
  }

  if (isButtonActive) {
    return `Transfer ${fromCurrency} to ${toCurrency}`;
  }

  return BUTTON_INACTIVE_TEXT;
}

export default setButtonText;
