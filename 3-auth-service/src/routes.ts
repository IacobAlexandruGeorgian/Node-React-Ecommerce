import { Application } from 'express';
import { verifyGatewayRequest } from '@iacobalexandrugeorgian/shared';
import { authRoutes } from '@auth/routes/auth';

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {

  app.use(BASE_PATH, verifyGatewayRequest, authRoutes());
};
