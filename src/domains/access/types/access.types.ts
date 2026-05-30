import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { USER_ROLE } from "../constants/user.constants.js";

import type { UserSchema } from "../models/user.model.js";

import { sanitizeUser } from "../sanitizers/user.sanitizer.js";

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = InferSchemaType<typeof UserSchema>;
export type UserDocument = HydratedDocument<User>;
export type UserLean = User & {
  _id: Types.ObjectId;
};

export type CreateTokenPairPayload = Record<string, string>;

export type AccessTokenPayload = {
  uid: string; // userId
  did: string; // deviceId
  sid: string; // sessionId
};

export type RefreshTokenPayload = {
  uid: string; // userId
  did: string; // deviceId
  sid: string; // sessionId
  ver: number; // refreshTokenVersion
};

export type VerifyUserPayload = {
  userId: string;
};

export type VerifyShopPayload = {
  userId: string;
  shopId: string;
};

// Services.
export type RegisterInput = {
  email: string;
  password: string;
};

export type QueueVerificationEmailInput = {
  userId: string;
};

export type VerifyEmailInput = {
  emailVerificationToken: string;
};

export type AccessBaseResult = {
  user: ReturnType<typeof sanitizeUser>;
  tokens: TokenPair;
};

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

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutAllInput = {
  userId: string;
};

export type LogoutAllExceptCurrentInput = {
  userId: string;
  deviceId: string;
};
