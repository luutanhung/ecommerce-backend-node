import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { PartialAppErrorParams } from "../../types/core/appError.js";
import { isUndefined } from "../../utils/object.util.js";

import { AppError } from "./appError.js";

export class BadRequestAppError extends AppError {
  constructor({ message, code, data }: PartialAppErrorParams = {}) {
    super({
      message: message || ResponseMessage.INVALID_REQUEST,
      statusCode: HttpStatusCode.BAD_REQUEST,
      code: code || ResponseCode.INVALID_REQUEST,
      ...(!isUndefined(data) && { data }),
    });
  }
}
