import { Router } from 'express';
import appRoutes from './appRoutes';
import exchangeRatesRoutes from './exchangeRatesRoutes';

const router: Router = Router();

exchangeRatesRoutes(router);
appRoutes(router);

export default router;
