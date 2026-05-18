import { ResponseCode } from "../../constants/response.constants.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class InternalSystemError extends AppError {
  constructor({
    message,
    code = ResponseCode.INTERNAL_SERVER_ERROR,
    data,
  }: PartialAppErrorConstructorParams = {}) {
    super({
      message,
      code,
      data,
    });
  }
}
