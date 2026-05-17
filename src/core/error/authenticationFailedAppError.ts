import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialAppErrorParams } from "../../types/core/appError.js";

import { AppError } from "./appError.js";

export class AuthenticationFailedAppError extends AppError {
  constructor({ code, data }: PartialAppErrorParams = {}) {
    super({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      code: code || ResponseCode.UNAUTHENTICATED,
      data,
    });
  }
}
