import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class ConflictAppError extends AppError {
  constructor({ message, code, data }: PartialAppErrorConstructorParams = {}) {
    super({
      message: message || ResponseMessage.CONFLICT,
      statusCode: HttpStatusCode.CONFLICT,
      code: code || ResponseCode.CONFLICT,
      data,
    });
  }
}
