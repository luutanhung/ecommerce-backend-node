import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialAppErrorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class InternalSystemError extends AppError {
  constructor({
    message,
    code = ResponseCode.INTERNAL_SERVER_ERROR,
    data,
  }: PartialAppErrorParams = {}) {
    super({
      message,
      code,
      data,
    });
  }
}
