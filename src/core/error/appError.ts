import { HttpStatusCode } from "../../constants/http.constant.js";
import { ResponseMessage } from "../../constants/response.constant.js";
import type {
  AppErrorData,
  AppErrorParams,
} from "../../types/core/appError.js";
import type { ResponseCodeKey } from "../../types/response.type.js";

export class AppError extends Error {
  statusCode: number;
  code: ResponseCodeKey;
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
