import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialAppErrorConstructorParams } from "../../shared/types/core/appError.type.js";

import { AppError } from "./appError.js";

export class NotFoundAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams) {
    super({
      statusCode: HttpStatusCode.NOT_FOUND,
      code: code || ResCode.NOT_FOUND,
      data,
    });
  }
}
