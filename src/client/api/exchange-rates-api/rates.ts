import API from './index';
import { ExchangeRates } from './types';
import { EXCHANGE_RATES_API_KEY } from '../../constants';

const fetchRates = () => API.get<ExchangeRates>(`/latest?access_key=${EXCHANGE_RATES_API_KEY!}&symbols=USD,GBP`);

// eslint-disable-next-line import/prefer-default-export
export { fetchRates };
