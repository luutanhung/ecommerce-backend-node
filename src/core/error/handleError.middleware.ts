import type { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../constants/http.constants.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constants.js";
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
  // eslint-disable-next-line
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return new ErrorResponse({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      data: err?.data,
    }).send(res);
  }

  if (err instanceof SyntaxError) {
    // Handle invalid JSON format.
    return new ErrorResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: ResponseCode.INVALID_JSON,
      message: ResponseMessage.INVALID_JSON,
    }).send(res);
  }

  return new ErrorResponse({
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    code: ResponseCode.INTERNAL_SERVER_ERROR,
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
  }).send(res);
};
