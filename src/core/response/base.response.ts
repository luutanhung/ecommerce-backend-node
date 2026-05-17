import type { Response } from "express";

import type {
  AppData,
  ResponseCodeKey,
  ResponseParams,
} from "../../types/core/response.type.js";
import type { OutgoingHttpHeaders } from "../../types/http.type.js";

export class BaseResponse {
  statusCode: number;
  code: ResponseCodeKey;
  message: string;
  data?: AppData;

  constructor({ message, statusCode, code, data }: ResponseParams) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public send(res: Response, headers: OutgoingHttpHeaders = {}) {
    res.set(headers);

    return res.status(this.statusCode).json(this);
  }
}
