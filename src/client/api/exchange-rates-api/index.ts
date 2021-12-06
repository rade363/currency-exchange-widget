import axios from 'axios';

const BASE_URL = '/';

const API = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'content-type': 'application/json',
  },
});

export default API;
