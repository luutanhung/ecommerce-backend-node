import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class InternalSystemError extends AppError {
  constructor({
    message,
    code = ResCode.INTERNAL_SERVER_ERROR,
    data,
  }: PartialAppErrorConstructorParams = {}) {
    super({
      message,
      code,
      data,
    });
  }
}
