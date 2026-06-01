import pino from "pino";

import { config } from "../configs/config.js";
import { env } from "../configs/env.js";

const logLevel = config.logger.level || env.isProd ? "info" : "debug";

const loggerConfig: pino.LoggerOptions = {
  level: logLevel,
  // Use ISO timestamps for consistency
  timestamp: pino.stdTimeFunctions.isoTime,
  // Add base fields to every log
  base: {
    env: env.NODE_ENV,
    service: "ecommerce-backend-node",
  }, // Redact sensitive information - CRITICAL for production security [citation:8]
  redact: {
    paths: [
      "password",
      "token",
      "access_token",
      "refresh_token",
      "secret",
      "apiKey",
      "authorization",
      "headers.authorization",
      "headers.cookie",
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
    ],
    censor: "[REDACTED]",
  },
  // Custom serializers for HTTP requests/responses
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort,
      // Only include safe headers
      headers: {
        "user-agent": req.headers?.["user-agent"],
        "content-type": req.headers?.["content-type"],
      },
    }),
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
  // Don't log hostname/pid in production to reduce noise
  ...(env.isProd && { base: null }),
};

let transport: pino.TransportSingleOptions | undefined;

if (env.isDev) {
  // Development: Pretty print to console with colors [citation:6][citation:10]
  transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss",
      ignore: "pid,hostname",
      singleLine: false,
    },
  };
} else if (env.LOG_TO_FILE === true) {
  // Optional: Write to file in production with log rotation
  // Requires: npm install pino-roll
  transport = {
    target: "pino-roll",
    options: {
      file: "/var/log/ecommerce-backend-node/app.log",
      size: "10m",
      interval: "1d",
      compress: true,
    },
  };
}

// Create the logger instance
export const logger = transport
  ? pino(loggerConfig, pino.transport(transport))
  : pino(loggerConfig);

// Create a child logger with request context
export const createRequestLogger = (
  requestId: string,
  context?: Record<string, unknown>,
) => {
  return logger.child({ requestId, ...context });
};
