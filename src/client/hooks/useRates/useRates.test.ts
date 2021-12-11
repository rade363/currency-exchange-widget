import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useRates from './index';
import { ExchangeRates } from '../../api/exchange-rates-api/types';
import { RatesTable } from '../../utils/calculate-rates/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const sampleRatesResponse: ExchangeRates = {
  success: true,
  timestamp: 1638793757,
  base: 'EUR',
  date: '2021-12-06',
  rates: {
    USD: 1.129797,
    GBP: 0.851217,
  },
};
const mockedResponse = {
  data: sampleRatesResponse,
};

const desiredRatesTable: RatesTable = {
  usdToGbp: 0.753425,
  usdToEur: 0.885115,
  eurToGbp: 0.851217,
  eurToUsd: 1.129797,
  gbpToEur: 1.174789,
  gbpToUsd: 1.327273,
};

describe('useRates hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should collect rates from API', async () => {
    mockedAxios.get.mockResolvedValue(mockedResponse);

    const { result, waitForNextUpdate } = renderHook(() => useRates());

    expect(result.current.areRatesCollected).toBe(false);
    expect(result.current.rates).toBeNull();

    await waitForNextUpdate();

    expect(result.current.areRatesCollected).toBe(true);
    expect(result.current.rates).not.toBeNull();
    expect(result.current.rates).toMatchObject(desiredRatesTable);
  });
});
