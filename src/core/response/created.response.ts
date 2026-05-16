import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ResponseParams } from "../../types/core/response.type.js";

import { SuccessResponse } from "./success.response.js";

export class CreatedResponse extends SuccessResponse {
  constructor({
    message = ResponseMessage.CREATED,
    statusCode = HttpStatusCode.CREATED,
    code = ResponseCode.CREATED,
    data,
  }: ResponseParams) {
    super({
      message,
      statusCode,
      code,
      data,
    });
  }
}
