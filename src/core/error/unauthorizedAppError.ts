import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialAppErrorConstructorParams } from "../../types/core/appError.type.js";

import { AppError } from "./appError.js";

export class UnauthorizedAppError extends AppError {
  constructor({
    code = ResponseCode.UNAUTHORIZED,
    data,
  }: PartialAppErrorConstructorParams) {
    super({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      code,
      data,
    });
  }
}
