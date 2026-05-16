import type { ResponseCodeKey } from "../response.type.js";

// eslint-disable-next-line
export type AppErrorData = { [key: string]: any };

export type AppErrorParams = {
  code: ResponseCodeKey;
  message?: string;
  statusCode?: number;
  data?: AppErrorData | undefined;
};

export type PartialAppErrorParams = Partial<AppErrorParams>;
