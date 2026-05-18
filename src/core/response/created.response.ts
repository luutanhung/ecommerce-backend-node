import { HttpStatusCode } from "../../constants/http.constants.js";
import { ResCode } from "../../constants/response.constants.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { SuccessResponse } from "./success.response.js";

export class CreatedResponse extends SuccessResponse {
  constructor({ code = ResCode.CREATED, data }: PartialResponseParams = {}) {
    super({
      statusCode: HttpStatusCode.CREATED,
      code,
      data,
    });
  }
}
