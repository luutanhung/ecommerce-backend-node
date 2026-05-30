import type { Express } from "express";

import { mainRouter } from "../mainRouter.js";

export const registerRoutes = (app: Express): void => {
  app.use(mainRouter);
};
