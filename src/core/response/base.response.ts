import type { Request, Response } from "express";
import _ from "lodash";

import { getResponseMessage } from "../../i18n/getResponseMessage.utils.js";
import type {
  AppData,
  ResponseCodeKey,
  ResponseParams,
} from "../../shared/types/core/response.type.js";
import type { OutgoingHttpHeaders } from "../../shared/types/http.type.js";

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

    const response: Record<string, unknown> = {
      code: this.code,
      message: getResponseMessage(this.code, req.locale),
    };

    if (!_.isUndefined(this.stack)) {
      response.stack = this.stack;
    }

    if (!_.isUndefined(this.data)) {
      response.data = this.data;
    }

    return res.status(this.statusCode).json(response);
  }
}
