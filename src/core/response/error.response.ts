import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class ErrorResponse extends BaseResponse {
  constructor({
    message = ResponseMessage.INTERNAL_SERVER_ERROR,
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    code = ResponseCode.INTERNAL_SERVER_ERROR,
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
