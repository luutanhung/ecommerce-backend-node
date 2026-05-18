import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { KeyTokenSchema } from "../models/keytoken.model.js";

export type KeyToken = InferSchemaType<typeof KeyTokenSchema>;
export type KeyTokenDocument = HydratedDocument<KeyToken>;
export type KeyTokenLean = KeyToken & {
  _id: Types.ObjectId;
};

export type CreateKeyTokenPayload = {
  userId: Types.ObjectId;
  privateKey: string;
  publicKey: string;
  refreshToken: string;
};

export type CreateKeyTokenResult = KeyTokenLean | null;

export type UpdateRefreshTokenPayload = {
  refreshToken: string;
};

export type DeleteKeyTokenByIdPayload = {
  id: Types.ObjectId;
};

export type DeleteKeyTokenByIdResult = KeyTokenLean;

export type DeleteKeyTokenByUserIdPayload = {
  userId: string;
};

export type DeleteKeyTokenByUserIdResult = KeyTokenLean;

export type FindKeyTokenByUserIdPayload = {
  userId: string;
};

export type FindKeyTokenByUserIdResult = KeyTokenLean | null;

export type FindKeyTokenByRefreshTokenUsedPayload = {
  refreshToken: string;
};

export type FindKeyTokenByRefreshTokenUsedResult = KeyTokenLean | null;

export type FindKeyTokenByRefreshTokenPayload = {
  refreshToken: string;
};

export type FindKeyTokenByRefreshTokenResult = KeyTokenLean | null;
