import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class AuthenticationFailedAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams = {}) {
    super({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      code: code || ResCode.UNAUTHENTICATED,
      data,
    });
  }
}
