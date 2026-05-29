import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class UnauthorizedAppError extends AppError {
  constructor({
    code = ResCode.UNAUTHORIZED,
    data,
  }: PartialAppErrorConstructorParams = {}) {
    super({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      code,
      data,
    });
  }
}
