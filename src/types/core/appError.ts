import type { ResponseCodeKey } from "../core/response.type.js";

// eslint-disable-next-line
export type AppErrorData = { [key: string]: any };

export type AppErrorParams = {
  code: ResponseCodeKey;
  message?: string;
  statusCode?: number;
  data?: AppErrorData;
};

export type PartialAppErrorParams = Partial<AppErrorParams>;
