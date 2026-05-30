// setups/error.setup.ts
import type { Express } from "express";

import { handleError } from "../core/error/handleError.middleware.js";

import { handleNotFoundRoute } from "../handlers/notFoundRoute.handler.js";

export const registerErrorHandlers = (app: Express): void => {
  app.use(handleNotFoundRoute);

  app.use(handleError);
};
