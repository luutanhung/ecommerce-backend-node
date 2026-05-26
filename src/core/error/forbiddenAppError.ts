import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ForbiddenAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams) {
    super({
      statusCode: HttpStatusCode.FORBIDDEN,
      code: code || ResCode.FORBIDDEN,
      data,
    });
  }
}
