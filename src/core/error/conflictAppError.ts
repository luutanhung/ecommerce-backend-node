import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ConflictAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams = {}) {
    const ultimateCode = code || ResCode.CONFLICT;

    super({
      statusCode: HttpStatusCode.CONFLICT,
      code: ultimateCode,
      data,
    });
  }
}
