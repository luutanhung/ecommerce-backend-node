import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialAppErrorParams } from "../../types/core/appError.js";

import { AppError } from "./appError.js";

export class BadRequestAppError extends AppError {
  constructor({ code, message, data }: PartialAppErrorParams = {}) {
    super({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: code || ResponseCode.INVALID_REQUEST,
      data,
    });
  }
}
