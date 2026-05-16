import compression from "compression";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { handleError } from "./core/error/handleError.middleware.js";

import { mainRouter } from "./routes/index.js";

const app: Express = express();

/**
 * Register middlewares.
 */
app.use(morgan("dev"));
app.use(helmet());
app.use(
  compression({
    level: 9,
  }),
);

// Parse application/json
app.use(express.json());

// Parse URL-encoded payloads.
app.use(
  express.urlencoded({
    extended: true,
  }),
);

/**
 * Register routers.
 */
app.use("", mainRouter);

// Universal error handler.
app.use(handleError);

export { app };
