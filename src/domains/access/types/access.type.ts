import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import type { UserRole } from "../constants/access.constants.js";

import type { UserSchema } from "../models/user.model.js";

import type { KeyTokenLean } from "../types/keytoken.type.js";

import { sanitizeUser } from "../../../shared/utils/sanitizer.utils.js";

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

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

export type AccessTokenPayload = {
  uid: string;
  did: string;
  sid: string;
};

export type RefreshTokenPayload = {
  uid: string; // userId
  did: string; // deviceId
  sid: string; // sessionId
  ver: number; // refreshTokenVersion
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
  deviceId: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutPayload = {
  sessionId: string;
};

export type LogoutResult = {
  keyToken: KeyTokenLean;
};

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutAllSessionsInput = {
  userId: string;
};

export type LogoutAllExceptCurrentInput = {
  userId: string;
  deviceId: string;
};
