import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode, ResMsg } from "../../constants/response.constants.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ConflictAppError extends AppError {
  constructor({ message, code, data }: PartialAppErrorConstructorParams = {}) {
    super({
      message: message || ResMsg.CONFLICT,
      statusCode: HttpStatusCode.CONFLICT,
      code: code || ResCode.CONFLICT,
      data,
    });
  }
}
