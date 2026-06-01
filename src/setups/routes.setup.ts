import type { Express } from "express";

import { mainRouter } from "../main.route.js";

export const registerRoutes = (app: Express): void => {
  app.use(mainRouter);
};
