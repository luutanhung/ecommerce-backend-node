import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { PartialAppErrorParams } from "../../types/core/appError.js";
import { isUndefined } from "../../utils/object.util.js";

import { AppError } from "./appError.js";

export class ConflictAppError extends AppError {
  constructor({ message, code, data }: PartialAppErrorParams = {}) {
    super({
      message: message || ResponseMessage.CONFLICT,
      statusCode: HttpStatusCode.CONFLICT,
      code: code || ResponseCode.CONFLICT,
      ...(!isUndefined(data) && { data }),
    });
  }
}
