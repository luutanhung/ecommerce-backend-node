import type { ResponseCodeKey } from "./core/response.type.js";

export type VerifyJSONWebTokenInput = {
  token: string;
  secret: string;
  expiredCode: ResponseCodeKey;
  invalidCode: ResponseCodeKey;
};
