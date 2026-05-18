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
  message: string;
  data?: AppData;

  constructor({ message, statusCode, code, data }: ResponseParams) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public send(req: Request, res: Response, headers: OutgoingHttpHeaders = {}) {
    res.set(headers);

    return res.status(this.statusCode).json({
      ...this,
      message: getResponseMessage(this.code, req.locale),
    });
  }
}
