import compression from "compression";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes/index.js";

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

app.use(router);

export { app };
