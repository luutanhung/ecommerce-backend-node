import { ResponseCode } from "../../constants/response.constant.js";

export type ResponseCodeKey = keyof typeof ResponseCode;

// eslint-disable-next-line
export type AppData = { [key: string]: any };

export type ResponseParams = {
  statusCode: number;
  code: ResponseCodeKey;
  message: string;
  data?: AppData;
};

export type PartialResponseParams = Partial<ResponseParams>;
