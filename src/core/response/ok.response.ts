import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseCode } from "../../constants/response.constant.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { SuccessResponse } from "./success.response.js";

export class OKResponse extends SuccessResponse {
  constructor({ code = ResponseCode.SUCCESS, data }: PartialResponseParams) {
    super({
      statusCode: HttpStatusCode.OK,
      code,
      data,
    });
  }
}
