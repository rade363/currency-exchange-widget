export enum CurrencyNamesEnum {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export type CurrencySignsLib = {
  [key in CurrencyNamesEnum]: string
};

// type Currency<T extends keyof CurrencyEnum> = [T, CurrencySigns[T]];

type CurrencyName = keyof typeof CurrencyNamesEnum;

export type Currency = {
  name: CurrencyName;
  sign: CurrencySignsLib[CurrencyName];
  rate: number;
};

export type Account = {
  balance: number;
  currency: Currency;
};

export type OwnProps = {
  type: 'From' | 'To';
  currentAccount: Account;
  otherAccount: Account;
};
