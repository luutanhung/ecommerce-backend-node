import type { Types } from "mongoose";

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type CreateTokenPairPayload = {
  userId: Types.ObjectId;
  email: string;
};
