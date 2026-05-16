import { ApiKeyPermission } from "../constants/apikey.constant.js";

export type ApiKeyPermission =
  (typeof ApiKeyPermission)[keyof typeof ApiKeyPermission];
