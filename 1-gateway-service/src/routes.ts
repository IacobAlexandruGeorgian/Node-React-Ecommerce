import { Application } from "express";
import { healthRoutes } from "./routes/health";
import { authRoutes } from '@gateway/routes/auth';
import { currentUserRoutes } from "@gateway/routes/current-user";
import { authMiddleware } from "@gateway/services/auth-middleware";
import { searchRoutes } from "@gateway/routes/search";
import { buyerRoutes } from "./routes/buyer";
import { sellerRoutes } from "./routes/seller";
import { gigRoutes } from "./routes/gig";
import { messageRoutes } from "./routes/message";
import { orderRoutes } from "./routes/order";
import { reviewRoutes } from "./routes/review";

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, buyerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, sellerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, gigRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, messageRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, orderRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, reviewRoutes.routes());
}
