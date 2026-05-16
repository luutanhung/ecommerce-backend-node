import type { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import { ErrorResponse } from "../response/error.response.js";

import { AppError } from "./appError.js";

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return new ErrorResponse({
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    code: ResponseCode.INTERNAL_SERVER_ERROR,
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
  }).send(res);
};
