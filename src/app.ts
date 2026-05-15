import compression from "compression";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

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

export { app };
