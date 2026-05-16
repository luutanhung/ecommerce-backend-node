import type { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ApiResponse } from "../../types/response.type.js";

import { AppError } from "./appError.js";

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      data: err?.data,
    });
  }

  const internalServerErrorResponse: ApiResponse = {
    code: ResponseCode.INTERNAL_SERVER_ERROR,
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
  };

  return res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json(internalServerErrorResponse);
};
