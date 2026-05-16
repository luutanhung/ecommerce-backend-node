import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { SuccessResponseParams } from "../../types/core/response.type.js";
import { isUndefined } from "../../utils/object.util.js";

import { SuccessResponse } from "./success.response.js";

export class OKResponse extends SuccessResponse {
  constructor({
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
    message = ResponseMessage.SUCCESS,
    data,
  }: SuccessResponseParams) {
    super({
      statusCode,
      code,
      message,
      ...(!isUndefined(data) && { data }),
    });
  }
}
