import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { env } from "../../configs/env.js";
import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { ErrorResponse } from "../response/error.response.js";

import { AppError } from "./appError.js";

/**
 * Express error handling middleware that processes application errors and converts them
 * into standardized error responses.
 *
 * This handler distinguishes between known `AppError` instances and unexpected errors,
 * returning appropriate HTTP responses with consistent formatting.
 *
 * @returns An error response sent to the client. Does not call `next()` as this is  a terminal error handler
 */
export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return new ErrorResponse({
      statusCode: err.statusCode,
      code: err.code,
      data: err?.data,
      stack: env.isDev ? err.stack : undefined,
    }).send(req, res);
  }

  /**
   * Handle Mongoose errors.
   */

  /**
   * Handle validation errors.
   */
  if (err instanceof mongoose.Error.ValidationError) {
    return new ErrorResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,

      code: ResCode.INVALID_REQUEST,

      data: {
        errors: Object.values(err.errors).map((error) => ({
          field: error.path,

          message: error.message,
        })),
      },

      stack: env.isDev ? err.stack : undefined,
    }).send(req, res);
  }

  /**
   * Handle cast errors.
   */
  if (err instanceof mongoose.Error.CastError) {
    return new ErrorResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,

      code: ResCode.INVALID_REQUEST,

      data: {
        field: err.path,

        value: err.value,
      },

      stack: env.isDev ? err.stack : undefined,
    }).send(req, res);
  }

  /**
   * Handle duplicate key.
   */
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    return new ErrorResponse({
      statusCode: HttpStatusCode.CONFLICT,

      code: ResCode.CONFLICT,

      data: {
        duplicatedFields: err.keyValue,
      },

      stack: env.isDev ? err.stack : undefined,
    }).send(req, res);
  }

  /**
   * Handle syntax errors.
   */
  if (err instanceof SyntaxError) {
    // Handle invalid JSON format.
    return new ErrorResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: ResCode.INVALID_JSON,
      stack: env.isDev ? err.stack : undefined,
    }).send(req, res);
  }

  /**
   * Handle unknown errors.
   */
  return new ErrorResponse({
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    code: ResCode.INTERNAL_SERVER_ERROR,
    stack: env.isDev ? err.stack : undefined,
  }).send(req, res);
};
