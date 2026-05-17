import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class SuccessResponse extends BaseResponse {
  constructor({
    message,
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
    data,
  }: PartialResponseParams = {}) {
    super({
      message: message || ResponseMessage[code],
      statusCode,
      code,
      data,
    });
  }
}
