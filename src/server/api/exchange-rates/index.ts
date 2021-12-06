import axios from 'axios';

export const HOST_URL = 'http://api.exchangeratesapi.io';
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
