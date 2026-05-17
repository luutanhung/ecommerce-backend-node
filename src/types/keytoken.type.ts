import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { keyTokenSchema } from "../models/keytoken.model.js";

export type KeyToken = InferSchemaType<typeof keyTokenSchema>;
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

export type FindKeyTokenByUserIdPayload = {
  userId: string;
};

export type FindKeyTokenByUserIdResult = KeyTokenLean | null;

export type DeleteKeyTokenByIdPayload = {
  id: Types.ObjectId;
};

export type DeleteKeyTokenByIdResult = KeyTokenLean;
