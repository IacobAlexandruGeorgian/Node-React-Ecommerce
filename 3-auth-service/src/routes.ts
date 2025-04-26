import { Application } from 'express';
import { verifyGatewayRequest } from '@iacobalexandrugeorgian/shared';
import { authRoutes } from '@auth/routes/auth';
import { currentUserRoutes } from './routes/current-user';
import { healthRoutes } from '@auth/routes/health';
import { searchRoutes } from './routes/search';
import { seedRoutes } from './routes/seed';

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
  app.use(BASE_PATH, searchRoutes());
  app.use(BASE_PATH, seedRoutes());

  app.use(BASE_PATH, verifyGatewayRequest, authRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, currentUserRoutes());
};
