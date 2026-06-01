import type { Express } from "express";

import { mainRouter } from "../main.router.js";

export const registerRoutes = (app: Express): void => {
  app.use(mainRouter);
};
