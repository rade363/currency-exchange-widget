import { Response, Router } from 'express';
import { AxiosError } from 'axios';
import { fetchRates } from '../api/exchange-rates/rates';
import createTimestamp from '../utils/create-timestamp';

function handleError(error: AxiosError, res: Response, errorText: string): void {
  console.error(
    `[${createTimestamp()}][ERROR] Request failed. Details (response or full error):`,
    error.response || error,
  );

  const message = error.response && error.response.statusText ? error.response.statusText : errorText;
  const status = error.response && error.response.status ? error.response.status : 500;

  res.json({
    message,
    status,
  });
}

export default function exchangeRatesRoutes(router: Router) {
  const RATES_ENDPOINT = '/rates';

  router.get(
    RATES_ENDPOINT,
    (req, res) => {
      fetchRates()
        .then(response => {
          res.json(response.data);
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .catch(error => handleError(error, res, 'Could not fetch exchange rates'));
    },
  );
}
