import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class SuccessResponse extends BaseResponse {
  constructor({
    message = ResponseMessage.SUCCESS,
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
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
