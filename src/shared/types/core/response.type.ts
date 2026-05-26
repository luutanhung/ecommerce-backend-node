import { ResCode } from "../../../constants/resCode.constants.js";

export type ResponseCodeKey = keyof typeof ResCode;

// eslint-disable-next-line
export type AppData = { [key: string]: any };

export type ResponseParams = {
  statusCode: number;
  code: ResponseCodeKey;
  data?: AppData;
  stack?: string;
};

export type PartialResponseParams = Partial<ResponseParams>;
