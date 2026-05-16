import type { ResponseCodeKey } from "../core/response.type.js";
import type { AppData } from "../core/response.type.js";

export type AppErrorParams = {
  code: ResponseCodeKey;
  message?: string;
  statusCode?: number;
  data?: AppData;
};

export type PartialAppErrorParams = Partial<AppErrorParams>;
