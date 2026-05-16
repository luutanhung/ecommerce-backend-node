import type { Response } from "express";

import { HttpStatusCode } from "../../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../../constants/response.constant.js";
import type { ResponseCodeKey } from "../../types/core/response.type.js";
import type { OutgoingHttpHeaders } from "../../types/http.type.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SuccessResponseData = { [key: string]: any };

type SuccessResponseParams = {
  statusCode?: number;
  code: ResponseCodeKey;
  message?: string;
  data?: SuccessResponseData;
};

export class SuccessResponse {
  statusCode: number;
  code: ResponseCodeKey;
  data: SuccessResponseData | undefined;
  message: string | undefined;

  constructor({
    message = ResponseMessage.SUCCESS,
    statusCode = HttpStatusCode.OK,
    code = ResponseCode.SUCCESS,
    data,
  }: SuccessResponseParams) {
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
    this.message = message;
  }

  public send(res: Response, headers: OutgoingHttpHeaders = {}) {
    res.set(headers);
    return res.status(this.statusCode).json(this);
  }
}
