import { sanitizeShop } from "../utils/sanitizer.utils.js";

import type { KeyTokenLean } from "./keytoken.type.js";

export type CreateTokenPairPayload = Record<string, string>;

export type CreateTokenPairInput = {
  payload: CreateTokenPairPayload;
  privateKey: string;
  publicKey: string;
};

export type AuthPayload = {
  userId: string;
  email: string;
};

// Services.
export type RegisterShopInput = {
  name: string;
  email: string;
  password: string;
};

export type AccessBaseResult = {
  shop: ReturnType<typeof sanitizeShop>;
  tokens: TokenPair;
};

export type RegisterShopResult = AccessBaseResult;

export type LoginShopInput = {
  email: string;
  password: string;
};

export type LoginShopResult = AccessBaseResult;

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

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenResult = {
  user: AuthPayload;
  tokens: TokenPair;
};
