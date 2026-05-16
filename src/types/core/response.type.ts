import { ResponseCode } from "../../constants/response.constant.js";

export type ResponseCodeKey = keyof typeof ResponseCode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuccessResponseData = { [key: string]: any };

export type SuccessResponseParams = {
  statusCode: number;
  code: ResponseCodeKey;
  message?: string;
  data?: SuccessResponseData;
};
