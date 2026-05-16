import crypto from "node:crypto";

import bcrypt from "bcrypt";

import { ResponseCode } from "../constants/response.constant.js";
import { ShopRole } from "../constants/shop.constant.js";

import { getInfoData } from "../utils/mapper.js";

import { Shops } from "../models/shop.model.js";

import type { SignUpPlayload } from "../types/access.type.js";

import { createTokenPair } from "../auth/auth.utils.js";
import { AppError } from "../error/appError.js";

import { KeyTokenService } from "./keytoken.service.js";

export class AccessService {
  static signUp = async ({ name, email, password }: SignUpPlayload) => {
    const existingShop = await Shops.findOne({ email }).lean();

    if (existingShop) {
      throw new AppError({
        code: ResponseCode.SHOP_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new shop.
    const newShop = await Shops.create({
      name,
      email,
      password: hashedPassword,
      roles: [ShopRole.SHOP],
    });

    // Generate a pair of private key and public key.
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const keyStore = await KeyTokenService.createKeyToken({
      userId: newShop._id,
      privateKey,
      publicKey,
    });

    if (!keyStore) {
      return {
        code: "xxxx",
        message: "publicKeyString error",
      };
    }

    // Create a pair of tokens.
    const tokens = await createTokenPair(
      {
        userId: newShop._id,
        email,
      },
      publicKey,
      privateKey,
    );

    return {
      shop: getInfoData(["_id", "name", "email"], newShop.toObject()),
      tokens,
    };
  };
}
