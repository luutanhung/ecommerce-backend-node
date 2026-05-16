import type { Response } from "express";
import { isUndefined } from "lodash";

import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ResponseCodeKey } from "../../types/core/response.type.js";
import type {
  SuccessResponseData,
  SuccessResponseParams,
} from "../../types/core/response.type.js";
import type { OutgoingHttpHeaders } from "../../types/http.type.js";

export class SuccessResponse {
  statusCode: number;
  code: ResponseCodeKey;
  data?: SuccessResponseData;
  message?: string;

  constructor({
    message = ResponseMessage.SUCCESS,
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
    data,
  }: SuccessResponseParams) {
    this.statusCode = statusCode;
    this.code = code;

    if (!isUndefined(data)) {
      this.data = data;
    }

    if (!isUndefined(message)) {
      this.message = message;
    }
  }

  public send(res: Response, headers: OutgoingHttpHeaders = {}) {
    res.set(headers);
    return res.status(this.statusCode).json(this);
  }
}
