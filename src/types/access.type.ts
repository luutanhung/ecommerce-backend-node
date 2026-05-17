import { sanitizeShop } from "../utils/sanitizer.js";

import type { TokenPair } from "./auth.type.js";

// Services.
export type RegisterPlayload = {
  name: string;
  email: string;
  password: string;
};

export type AccessBaseResult = {
  shop: ReturnType<typeof sanitizeShop>;
  tokens: TokenPair;
};

export type RegisterResult = AccessBaseResult;

export type LoginPayload = {
  email: string;
  password: string;
  refreshToken: string;
};

export type LoginResult = AccessBaseResult;
