import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

import { AppError } from "../core/error/appError.js";
import { AuthenticationFailedAppError } from "../core/error/authenticationFailedAppError.js";
import { ForbiddenAppError } from "../core/error/forbiddenAppError.js";
import { NotFoundAppError } from "../core/error/notFoundAppError.js";
import { UnauthorizedAppError } from "../core/error/unauthorizedAppError.js";

import { ResponseCode } from "../constants/response.constant.js";
import { ShopRole } from "../constants/shop.constant.js";

import { createKeyPair } from "../utils/generator.utils.js";
import { sanitizeShop } from "../utils/sanitizer.utils.js";
import { createTokenPair, verifyJSONWebToken } from "../utils/token.utils.js";

import { Shops } from "../models/shop.model.js";

import type {
  AuthPayload,
  LoginPayload,
  LoginResult,
  LogoutPayload,
  LogoutResult,
  RefreshTokenPayload,
  RegisterPlayload,
  RegisterResult,
  TokenPair,
} from "../types/access.type.js";
import type { KeyTokenLean } from "../types/keytoken.type.js";
import type { ShopDocument } from "../types/shop.type.js";
import type { KeyPair } from "../types/utils.type.js";

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

    const authPayload: AuthPayload = {
      userId: newCreatedShop._id.toString(),
      email,
    };

    // Create a pair of tokens.
    const tokenPair: TokenPair = await createTokenPair(
      authPayload,
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

    const authPayload: AuthPayload = {
      userId: userIdToCreateTokenPair.toString(),
      email,
    };

    const tokenPair: TokenPair = await createTokenPair(
      authPayload,
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

  /**
   * Logouts.
   */
  static logout = async ({
    keyToken,
  }: LogoutPayload): Promise<LogoutResult> => {
    const deletedKeyToken = await KeyTokenService.deleteKeyTokenById({
      id: keyToken._id,
    });

    return {
      keyToken: deletedKeyToken,
    };
  };

  /**
   * Verify provided refresh token and generate new access token.
   */
  static refreshToken = async ({ refreshToken }: RefreshTokenPayload) => {
    // Find key token associated to refresh token argument.
    const foundKeyToken: KeyTokenLean =
      await KeyTokenService.findKeyTokenByRefreshTokenUsed({
        refreshToken,
      });

    if (foundKeyToken) {
      // CRITICAL: Detected a user who has reused refresh token.
      try {
        const { userId }: AuthPayload = await verifyJSONWebToken<AuthPayload>(
          refreshToken,
          foundKeyToken.privateKey,
        );

        // Delete all key token instances connected with this user.
        await KeyTokenService.deleteKeyTokenByUserId({ userId });

        throw new ForbiddenAppError({
          code: ResponseCode.REFRESH_TOKEN_REUSED,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedAppError({
            code: ResponseCode.REFRESH_TOKEN_EXPIRED,
          });
        } else if (err instanceof jwt.JsonWebTokenError) {
          throw new UnauthorizedAppError({
            code: ResponseCode.REFRESH_TOKEN_INVALID,
          });
        }

        throw err;
      }
    }
  };
}
