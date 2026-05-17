import crypto from "node:crypto";

import bcrypt from "bcrypt";

import { AppError } from "../core/error/appError.js";

import { ResponseCode } from "../constants/response.constant.js";
import { ShopRole } from "../constants/shop.constant.js";

import { sanitizeShop } from "../utils/sanitizer.js";

import { Shops } from "../models/shop.model.js";

import type { SignUpPlayload } from "../types/access.type.js";
import type { TokenPair } from "../types/auth.type.js";

import { createTokenPair } from "../auth/auth.utils.js";

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

    // Register a new shop.
    const newCreatedShop = await Shops.create({
      name,
      email,
      password: hashedPassword,
      roles: [ShopRole.SHOP],
    });

    // Generate a pair of private key and public key.
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    await KeyTokenService.createKeyToken({
      userId: newCreatedShop._id,
      privateKey,
      publicKey,
    });

    // Create a pair of tokens.
    const tokenPair: TokenPair = await createTokenPair(
      {
        userId: newCreatedShop._id,
        email,
      },
      publicKey,
      privateKey,
    );

    return {
      shop: sanitizeShop(newCreatedShop),
      tokens: tokenPair,
    };
  };

  // static login = async ({ email, password, refreshToken = null }) => {};
}
