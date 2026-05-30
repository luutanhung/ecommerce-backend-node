// setups/middleware.setup.ts
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { i18nMiddleware } from "../shared/middlewares/i18n.middleware.js";
import {
  attachRequestId,
  // requestLogger,
} from "../shared/middlewares/logger.middleware.js";

export const registerMiddlewares = (app: Express): void => {
  app.use(morgan("dev"));

  app.use(helmet());

  app.use(
    compression({
      level: 9,
    }),
  );

  app.use(attachRequestId);

  // app.use(requestLogger);

  app.use(express.json());

  app.use(cookieParser());

  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  app.use(i18nMiddleware);
};
