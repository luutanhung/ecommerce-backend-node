// setups/swagger.setup.ts
import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "../configs/swagger.js";

export const registerSwagger = (app: Express): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
