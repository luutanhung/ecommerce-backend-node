import { sanitizeShop } from "../utils/sanitizer.utils.js";

import type { KeyTokenLean } from "./keytoken.type.js";

export type CreateTokenPairPayload = Record<string, string>;

export type AuthPayload = {
  userId: string;
  email: string;
};

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

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutPayload = {
  keyToken: KeyTokenLean;
};

export type LogoutResult = {
  keyToken: KeyTokenLean;
};
