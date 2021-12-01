import axios from 'axios';
import { EXCHANGE_RATES_API_URL } from '../../constants';

const HOST_URL = EXCHANGE_RATES_API_URL;
const BASE_URL = `${HOST_URL}/v1/`;

const API = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'content-type': 'application/json',
  },
});

export default API;
