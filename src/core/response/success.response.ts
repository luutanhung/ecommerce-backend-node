import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class SuccessResponse extends BaseResponse {
  constructor({
    statusCode = HttpStatusCode.OK,
    code = ResCode.SUCCESS,
    data,
  }: PartialResponseParams = {}) {
    super({
      message: getResponseMessage(code),
      statusCode,
      code,
      data,
    });
  }
}
