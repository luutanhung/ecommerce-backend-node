import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { SuccessResponse } from "./success.response.js";

export class OKResponse extends SuccessResponse {
  constructor({ code = ResCode.SUCCESS, data }: PartialResponseParams = {}) {
    super({
      statusCode: HttpStatusCode.OK,
      code,
      data,
    });
  }
}
