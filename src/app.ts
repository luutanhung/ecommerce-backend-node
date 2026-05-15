import type { Express } from "express";
import express from "express";
import morgan from "morgan";

const app: Express = express();

/**
 * Register middlewares.
 */
app.use(morgan("dev"));

export { app };
