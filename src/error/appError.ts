import { HttpStatusCode } from "../constants/http.constant.js";
import { ResponseMessage } from "../constants/response.constant.js";

import type { ResponseCodeKey } from "../types/response.type.js";

// eslint-disable-next-line
type AppErrorData = { [key: string]: any };

type AppErrorParams = {
  code: ResponseCodeKey;
  message?: string;
  statusCode?: number;
  data?: AppErrorData;
};

export class AppError extends Error {
  code: ResponseCodeKey;
  statusCode: number;

  data: AppErrorData | undefined;

  constructor({
    code,
    message = ResponseMessage[code],
    statusCode = HttpStatusCode.BAD_REQUEST,
    data,
  }: AppErrorParams) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;
    this.data = data;

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
