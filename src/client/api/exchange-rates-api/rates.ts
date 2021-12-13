import axios from 'axios';
import { ExchangeRates } from './types';

const fetchRates = () => axios.get<ExchangeRates>('/rates');

// eslint-disable-next-line import/prefer-default-export
export { fetchRates };
