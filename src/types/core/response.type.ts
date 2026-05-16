import { ResponseCode } from "../../constants/response.constant.js";

export type ResponseCodeKey = keyof typeof ResponseCode;

export type ApiResponse<T = unknown> = {
  code: ResponseCodeKey;
  message: string;
  data?: T;
};
