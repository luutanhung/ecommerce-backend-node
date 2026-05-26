import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ConflictAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams = {}) {
    const ultimateCode = code || ResCode.CONFLICT;

    super({
      message: getResponseMessage(ultimateCode),
      statusCode: HttpStatusCode.CONFLICT,
      code: ultimateCode,
      data,
    });
  }
}
