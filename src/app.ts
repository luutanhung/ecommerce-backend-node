import compression from "compression";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
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

/**
 * Register routers.
 */
app.use("", mainRouter);

export { app };
