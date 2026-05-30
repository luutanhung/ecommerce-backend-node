import type { Express } from "express";
import express from "express";

import { serverAdapter } from "./setups/bullDashboard.setup.js";
import { registerErrorHandlers } from "./setups/error.setup.js";
import { registerMiddlewares } from "./setups/middleware.setup.js";
import { registerRoutes } from "./setups/routes.setup.js";

const app: Express = express();

registerMiddlewares(app);

/**
 * BullMQ Dashboard.
 */
app.use("/admin/queues", serverAdapter.getRouter());

registerRoutes(app);

registerErrorHandlers(app);

export { app };
