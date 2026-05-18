import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class BadRequestAppError extends AppError {
  constructor({
    code,
    message,
    data,
    stack,
  }: PartialAppErrorConstructorParams = {}) {
    super({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: code || ResCode.INVALID_REQUEST,
      data,
      stack,
    });
  }
}
