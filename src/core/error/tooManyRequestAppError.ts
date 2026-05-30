import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class TooManyRequestsAppError extends AppError {
  constructor({
    code = ResCode.RATE_LIMIT_EXCEEDED,
    data,
  }: PartialAppErrorConstructorParams = {}) {
    super({
      statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
      code,
      data,
    });
  }
}
