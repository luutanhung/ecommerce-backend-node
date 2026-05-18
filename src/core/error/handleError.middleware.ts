import type { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
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
      message: getResponseMessage(err.code),
      data: err?.data,
    }).send(req, res);
  }

  if (err instanceof SyntaxError) {
    // Handle invalid JSON format.
    return new ErrorResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: ResCode.INVALID_JSON,
      message: getResponseMessage(ResCode.INVALID_JSON),
    }).send(req, res);
  }

  return new ErrorResponse({
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    code: ResCode.INTERNAL_SERVER_ERROR,
    message: getResponseMessage(ResCode.INVALID_JSON),
  }).send(req, res);
};
