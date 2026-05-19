import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import type { UserSchema } from "../models/user.model.js";

import type { KeyTokenLean } from "../types/keytoken.type.js";

import { sanitizeUser } from "../../../utils/sanitizer.utils.js";

export type User = InferSchemaType<typeof UserSchema>;
export type UserDocument = HydratedDocument<User>;
export type UserLean = User & {
  _id: Types.ObjectId;
};

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
export type RegisterUserInput = {
  email: string;
  password: string;
};

export type AccessBaseResult = {
  user: ReturnType<typeof sanitizeUser>;
  tokens: TokenPair;
};

export type RegisterUserResult = Pick<AccessBaseResult, "user">;

export type LoginInput = {
  email: string;
  password: string;
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

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenResult = {
  user: AuthPayload;
  tokens: TokenPair;
};
