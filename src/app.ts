import compression from "compression";
import cookieParser from "cookie-parser";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { handleError } from "./core/error/handleError.middleware.js";

import { i18nMiddleware } from "./shared/middlewares/i18n.middleware.js";

import { swaggerSpec } from "./configs/swagger.js";

import { handleNotFoundRoute } from "./handlers/notFoundRoute.handler.js";

import { mainRouter } from "./mainRouter.js";

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
app.use(cookieParser());

// Parse URL-encoded payloads.
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(i18nMiddleware);

/**
 * Swagger API.
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Register routers.
 */
app.use(mainRouter);

/**
 * Handle 404 Not found route.
 */
app.use(handleNotFoundRoute);

/**
 * Universal error handler.
 */
app.use(handleError);

export { app };
