import API from './index';
import { ExchangeRates } from './types';

const fetchRates = () => API.get<ExchangeRates>('rates');

// eslint-disable-next-line import/prefer-default-export
export { fetchRates };
