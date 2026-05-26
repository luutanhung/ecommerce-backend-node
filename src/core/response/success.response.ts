import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialResponseParams } from "../../shared/types/core/response.type.js";

import { BaseResponse } from "./base.response.js";

export class SuccessResponse extends BaseResponse {
  constructor({
    statusCode = HttpStatusCode.OK,
    code = ResCode.SUCCESS,
    data,
  }: PartialResponseParams = {}) {
    super({
      statusCode,
      code,
      data,
    });
  }
}
