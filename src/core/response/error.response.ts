import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class ErrorResponse extends BaseResponse {
  constructor({
    message = getResponseMessage(ResCode.INTERNAL_SERVER_ERROR),
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
