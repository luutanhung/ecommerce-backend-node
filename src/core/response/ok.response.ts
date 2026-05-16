import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { PartialResponseParams } from "../../types/core/response.type.js";

import { SuccessResponse } from "./success.response.js";

export class OKResponse extends SuccessResponse {
  constructor({
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
    message = ResponseMessage.SUCCESS,
    data,
  }: PartialResponseParams) {
    super({
      statusCode,
      code,
      message,
      data,
    });
  }
}
