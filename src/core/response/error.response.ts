import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class ErrorResponse extends BaseResponse {
  constructor({
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    code = ResCode.INTERNAL_SERVER_ERROR,
    data,
    stack,
  }: PartialResponseParams = {}) {
    super({
      statusCode,
      code,
      data,
      stack,
    });
  }
}
