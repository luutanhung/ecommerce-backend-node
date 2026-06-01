// middleware/logger.middleware.ts
import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";

import { createRequestLogger, logger } from "../../libs/logger.js";

// Request ID middleware - attaches unique ID to every request
export const attachRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  req.id = requestId;
  res.setHeader("x-request-id", requestId);
  next();
};

// Structured request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  // Create child logger with request context [citation:8]
  const requestLogger = createRequestLogger(req.id as string, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  // Attach to request object for use in route handlers
  req.log = requestLogger;

  // Log when request starts (only in debug mode to reduce noise)
  if (process.env.NODE_ENV !== "production") {
    requestLogger.debug({ req }, "Incoming request");
  }

  // Log when response completes
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const level =
      res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";

    requestLogger[level](
      {
        res: {
          statusCode: res.statusCode,
        },
        duration: `${duration}ms`,
      },
      `${req.method} ${req.url} completed`,
    );
  });

  next();
};

// Error logging middleware
export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestLogger = req.log || logger;

  requestLogger.error(
    {
      err,
      url: req.url,
      method: req.method,
      body: process.env.NODE_ENV !== "production" ? req.body : undefined,
    },
    "Request error",
  );

  next(err);
};
