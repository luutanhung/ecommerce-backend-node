import type { Types } from "mongoose";
import mongoose from "mongoose";

import { AppError } from "../core/error/appError.js";

import { HttpStatusCode } from "../constants/http.constant.js";
import { ResponseCode } from "../constants/response.constant.js";

import { KeyTokens } from "../models/keytoken.model.js";

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
  }: {
    userId: Types.ObjectId;
    privateKey: string;
    publicKey: string;
  }) => {
    try {
      const tokens = await KeyTokens.create({
        user: userId,
        privateKey,
        publicKey,
      });

      return tokens ? tokens : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof mongoose.mongo.MongoServerError) {
        throw new AppError({
          code: ResponseCode.SHOP_ALREADY_REGISTERED,
          statusCode: HttpStatusCode.CONFLICT,
        });
      }

      throw err;
    }
  };
}
