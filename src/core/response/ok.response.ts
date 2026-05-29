import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PartialResponseParams } from "../../shared/types/core/response.type.js";

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
