import type { Request, Response } from "express";

import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
import type {
  AppData,
  ResponseCodeKey,
  ResponseParams,
} from "../../types/core/response.type.js";
import type { OutgoingHttpHeaders } from "../../types/http.type.js";

export class BaseResponse {
  statusCode: number;
  code: ResponseCodeKey;
  data?: AppData;
  stack?: string;

  constructor({ statusCode, code, data, stack }: ResponseParams) {
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
    this.stack = stack;
  }

  public send(req: Request, res: Response, headers: OutgoingHttpHeaders = {}) {
    res.set(headers);

    return res.status(this.statusCode).json({
      ...this,
      ...(this.stack && {
        stack: this.stack,
      }),
      message: getResponseMessage(this.code, req.locale),
    });
  }
}
