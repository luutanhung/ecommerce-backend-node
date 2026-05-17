import mongoose, { Types, type UpdateResult } from "mongoose";

import { AppError } from "../core/error/appError.js";
import { NotFoundAppError } from "../core/error/notFoundAppError.js";

import { HttpStatusCode } from "../constants/http.constant.js";
import { ResponseCode } from "../constants/response.constant.js";

import { KeyTokens } from "../models/keytoken.model.js";

import type {
  CreateKeyTokenPayload,
  CreateKeyTokenResult,
  DeleteKeyTokenByIdPayload,
  DeleteKeyTokenByIdResult,
  DeleteKeyTokenByUserIdPayload,
  DeleteKeyTokenByUserIdResult,
  FindKeyTokenByRefreshTokenPayload,
  FindKeyTokenByRefreshTokenResult,
  FindKeyTokenByRefreshTokenUsedPayload,
  FindKeyTokenByRefreshTokenUsedResult,
  FindKeyTokenByUserIdPayload,
  FindKeyTokenByUserIdResult,
  UpdateRefreshTokenPayload,
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
   * Updates refresh token.
   */
  static updateRefreshToken = async ({
    refreshToken,
  }: UpdateRefreshTokenPayload): Promise<UpdateResult> => {
    return await KeyTokens.updateOne(
      {
        refreshToken,
      },
      {
        $addToSet: {
          refreshTokensUsed: refreshToken,
        },
      },
    );
  };

  /**
   * Delete key token by id.
   */
  static deleteKeyTokenById = async ({
    id,
  }: DeleteKeyTokenByIdPayload): Promise<DeleteKeyTokenByIdResult> => {
    const deletedKeyToken = await KeyTokens.findByIdAndDelete(id).lean();

    if (!deletedKeyToken) {
      throw new NotFoundAppError({
        code: ResponseCode.SHOP_NOT_LOGGED_IN,
      });
    }

    return deletedKeyToken;
  };

  /**
   * Delete key token by user id.
   */
  static deleteKeyTokenByUserId = async ({
    userId,
  }: DeleteKeyTokenByUserIdPayload): Promise<DeleteKeyTokenByUserIdResult> => {
    const deletedKeyToken = await KeyTokens.findOneAndDelete({
      user: new Types.ObjectId(userId),
    });

    if (!deletedKeyToken) {
      throw new NotFoundAppError({
        code: ResponseCode.SHOP_NOT_LOGGED_IN,
      });
    }

    return deletedKeyToken;
  };

  /**
   * Find key token instance by user id.
   */
  static findKeyTokenByUserId = async ({
    userId,
  }: FindKeyTokenByUserIdPayload): Promise<FindKeyTokenByUserIdResult> => {
    return await KeyTokens.findOne({ user: new Types.ObjectId(userId) }).lean();
  };

  /**
   * Find key token by used refresh token.
   */
  static findKeyTokenByRefreshTokenUsed = async ({
    refreshToken,
  }: FindKeyTokenByRefreshTokenUsedPayload): Promise<FindKeyTokenByRefreshTokenUsedResult> => {
    const foundKeyToken = await KeyTokens.findOne({
      refreshTokensUsed: refreshToken,
    }).lean();

    return foundKeyToken;
  };

  /**
   * Find key token by refresh token.
   */
  static findKeyTokenByRefreshToken = async ({
    refreshToken,
  }: FindKeyTokenByRefreshTokenPayload): Promise<FindKeyTokenByRefreshTokenResult> => {
    const foundKeyToken = await KeyTokens.findOne({
      refreshToken,
    });

    return foundKeyToken;
  };
}
