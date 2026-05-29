import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class BadRequestAppError extends AppError {
  constructor({ code, message, data }: PartialAppErrorConstructorParams = {}) {
    super({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: code || ResCode.INVALID_REQUEST,
      data,
    });
  }
}
