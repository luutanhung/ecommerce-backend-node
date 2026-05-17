import mongoose, { Types } from "mongoose";

import { AppError } from "../core/error/appError.js";

import { HttpStatusCode } from "../constants/http.constant.js";
import { ResponseCode } from "../constants/response.constant.js";

import { KeyTokens } from "../models/keytoken.model.js";

import type {
  CreateKeyTokenPayload,
  CreateKeyTokenResult,
  FindKeyTokenByUserIdPayload,
  FindKeyTokenByUserIdResult,
} from "../types/keytoken.type.js";

export class KeyTokenService {
  /**
   * Creates a new key token document instance.
   */
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
    refreshToken,
  }: CreateKeyTokenPayload): Promise<CreateKeyTokenResult> => {
    try {
      const tokens = await KeyTokens.findOneAndUpdate(
        {
          user: userId,
        },
        {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        {
          upsert: true,
          new: true,
        },
      ).lean();

      return tokens ? tokens : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof mongoose.mongo.MongoServerError) {
        throw new AppError({
          code: ResponseCode.KEY_TOKEN_ALREADY_EXISTS,
          statusCode: HttpStatusCode.CONFLICT,
        });
      }

      throw err;
    }
  };

  /**
   * Find key token instance by user id.
   */
  static findKeyTokenByUserId = async ({
    userId,
  }: FindKeyTokenByUserIdPayload): Promise<FindKeyTokenByUserIdResult> => {
    return await KeyTokens.findOne({ user: new Types.ObjectId(userId) }).lean();
  };
}
