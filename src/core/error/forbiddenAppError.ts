import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ForbiddenAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams) {
    super({
      statusCode: HttpStatusCode.FORBIDDEN,
      code: code || ResponseCode.FORBIDDEN,
      data,
    });
  }
}
