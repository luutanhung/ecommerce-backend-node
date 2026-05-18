import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResponseCode } from "../../constants/response.constants.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class NotFoundAppError extends AppError {
  constructor({ code, data }: PartialAppErrorConstructorParams) {
    super({
      statusCode: HttpStatusCode.NOT_FOUND,
      code: code || ResponseCode.NOT_FOUND,
      data,
    });
  }
}
