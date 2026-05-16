import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { SuccessResponseParams } from "../../types/core/response.type.js";
import { isUndefined } from "../../utils/object.util.js";

import { SuccessResponse } from "./success.response.js";

export class CreatedResponse extends SuccessResponse {
  constructor({
    message = ResponseMessage.CREATED,
    statusCode = HttpStatusCode.CREATED,
    code = ResponseCode.CREATED,
    data,
  }: SuccessResponseParams) {
    super({
      message,
      statusCode,
      code,
      ...(!isUndefined(data) && { data }),
    });
  }
}
