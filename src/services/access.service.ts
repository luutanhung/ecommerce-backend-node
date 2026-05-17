import bcrypt from "bcrypt";
import type { Types } from "mongoose";

import { AppError } from "../core/error/appError.js";
import { AuthenticationFailedAppError } from "../core/error/authenticationFailedAppError.js";
import { NotFoundAppError } from "../core/error/notFoundAppError.js";

import { ResponseCode } from "../constants/response.constant.js";
import { ShopRole } from "../constants/shop.constant.js";

import { createKeyPair } from "../utils/generator.js";
import { sanitizeShop } from "../utils/sanitizer.js";

import { Shops } from "../models/shop.model.js";

import type {
  LoginPayload,
  LoginResult,
  RegisterPlayload,
  RegisterResult,
} from "../types/access.type.js";
import type { CreateTokenPairPayload, TokenPair } from "../types/auth.type.js";
import type { ShopDocument } from "../types/shop.type.js";
import type { KeyPair } from "../types/utils.type.js";

import { createTokenPair } from "../auth/auth.utils.js";

import { KeyTokenService } from "./keytoken.service.js";
import { findShopByEmail } from "./shop.service.js";

export class AccessService {
  /**
   * Registers a new shop.
   */
  static register = async ({
    name,
    email,
    password,
  }: RegisterPlayload): Promise<RegisterResult> => {
    const existingShop = await Shops.findOne({ email }).lean();

    if (existingShop) {
      throw new AppError({
        code: ResponseCode.SHOP_ALREADY_EXISTS,
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Register a new shop.
    const newCreatedShop: ShopDocument = await Shops.create({
      name,
      email,
      password: hashedPassword,
      roles: [ShopRole.SHOP],
    });

    // Generate a pair of private key and public key.
    const { privateKey, publicKey }: KeyPair = await createKeyPair();

    // Create a pair of tokens.
    const tokenPair: TokenPair = await createTokenPair(
      {
        userId: newCreatedShop._id,
        email,
      },
      publicKey,
      privateKey,
    );

    // Store refreshToken in KeyToken model.
    await KeyTokenService.createKeyToken({
      userId: newCreatedShop._id,
      privateKey,
      publicKey,
      refreshToken: tokenPair.refreshToken,
    });

    return {
      shop: sanitizeShop(newCreatedShop.toObject()),
      tokens: tokenPair,
    };
  };

  /**
   * Logins with shop's payload.
   */
  static login = async ({
    email,
    password,
  }: LoginPayload): Promise<LoginResult> => {
    // Find shop registered with passed-in email.
    const registeredShop = await findShopByEmail(email);

    if (!registeredShop) {
      throw new NotFoundAppError({
        code: ResponseCode.SHOP_NOT_FOUND,
      });
    }

    // Check if provided password is matched with stored password.
    const passwordIsMatched: boolean = await bcrypt.compare(
      password,
      registeredShop.password,
    );

    if (!passwordIsMatched) {
      throw new AuthenticationFailedAppError();
    }

    // Generate a pair of publicKey and privateKey.
    const { privateKey, publicKey }: KeyPair = await createKeyPair();

    const userIdToCreateTokenPair: Types.ObjectId = registeredShop._id;

    const createTokenPairPayload: CreateTokenPairPayload = {
      userId: userIdToCreateTokenPair,
      email,
    };

    const tokenPair: TokenPair = await createTokenPair(
      createTokenPairPayload,
      publicKey,
      privateKey,
    );

    await KeyTokenService.createKeyToken({
      userId: userIdToCreateTokenPair,
      publicKey,
      privateKey,
      refreshToken: tokenPair.refreshToken,
    });

    return {
      shop: sanitizeShop(registeredShop),
      tokens: tokenPair,
    };
  };
}
