import React, { useState } from 'react';
import useRates from '../../hooks/useRates';
import Loader from '../loader';
import ExchangeController from '../../controllers/exchange-controller';

import './app.scss';

import userAccountSample from './user.json';
import { User, UserAccount } from './types';

const user = userAccountSample as User;

export default function App() {
  const [accounts, setAccounts] = useState<UserAccount[]>(user.accounts);
  const { areRatesCollected, rates } = useRates();

  if (!areRatesCollected || !rates) {
    return (
      <div className="app">
        <div className="app__container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__container">
        <ExchangeController
          rates={rates}
          accounts={accounts}
          setAccounts={setAccounts}
        />
      </div>
    </div>
  );
}
