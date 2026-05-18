import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode, ResMsg } from "../../constants/resCode.constants.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class ErrorResponse extends BaseResponse {
  constructor({
    message = ResMsg.INTERNAL_SERVER_ERROR,
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    code = ResCode.INTERNAL_SERVER_ERROR,
    data,
  }: PartialResponseParams = {}) {
    super({
      message,
      statusCode,
      code,
      data,
    });
  }
}
