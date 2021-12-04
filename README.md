# Currency Exchange Widget

## Functionality
* Transfer funds between accounts in USD, EUR, GBP
* The exchange rate is updated every 10 seconds
* App UI prototype is available on [Figma](https://www.figma.com/file/l5ZKI9nTh8PTiIRNYWv40f/Currency-Exchange-Widget?node-id=2%3A2).
* Currency rates are retrieved from [exchangeratesapi.io](https://exchangeratesapi.io/documentation/#latestrates). It has a free plan, but only `EUR` is available as the base currency there.

## Usage
* Install dependencies using `npm i`.
* Create an `.env` file in the root directory of the project. Sample is available below.
* Build the app using `npm run build`.
* Start the app using `npm run start`.
* Open [http://localhost:5000](http://localhost:5000) in your web browser to access the app.

## Other
* Run the tests by `npm run test`.

## ENV File Sample
```
NODE_ENV=development

WEB_HOST=http://localhost
WEB_PORT=5000

EXCHANGE_RATES_API_KEY=specify-exchangeratesapi.io-key-here
```
