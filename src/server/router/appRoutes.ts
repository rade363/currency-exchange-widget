import { Router } from 'express';
import clientRenderMiddleware from '../middlewares/clientRenderMiddleware';

export default function appRoutes(router: Router) {
  router.get('*', clientRenderMiddleware);
}
