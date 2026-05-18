import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode, ResMsg } from "../../constants/resCode.constants.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class SuccessResponse extends BaseResponse {
  constructor({
    message,
    statusCode = HttpStatusCode.OK,
    code = ResCode.SUCCESS,
    data,
  }: PartialResponseParams = {}) {
    super({
      message: message || ResMsg[code],
      statusCode,
      code,
      data,
    });
  }
}
