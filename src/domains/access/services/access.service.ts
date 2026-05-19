import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import type { Types } from "mongoose";

import { UserRole } from "../constants/access.constants.js";

import { Users } from "../models/user.model.js";

import type {
  AuthPayload,
  LoginInput,
  LoginResult,
  LogoutPayload,
  LogoutResult,
  RefreshTokenInput,
  RefreshTokenResult,
  RegisterUserInput,
  RegisterUserResult,
  TokenPair,
  UserDocument,
} from "../types/access.type.js";

import { ResCode } from "../../../constants/resCode.constants.js";
import { AppError } from "../../../core/error/appError.js";
import { AuthenticationFailedAppError } from "../../../core/error/authenticationFailedAppError.js";
import { ForbiddenAppError } from "../../../core/error/forbiddenAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { UnauthorizedAppError } from "../../../core/error/unauthorizedAppError.js";
import type { KeyPair } from "../../../types/utils.type.js";
import { createKeyPair } from "../../../utils/generator.utils.js";
import { sanitizeUser } from "../../../utils/sanitizer.utils.js";
import {
  createTokenPair,
  verifyJSONWebToken,
} from "../../../utils/token.utils.js";

import { KeyTokenService } from "./keytoken.service.js";
import { UserService } from "./user.service.js";

export class AccessService {
  /**
   * Registers a new shop.
   */
  static register = async ({
    email,
    password,
  }: RegisterUserInput): Promise<RegisterUserResult> => {
    const existingUser = await Users.findOne({ email }).lean();

    if (existingUser) {
      throw new AppError({
        code: ResCode.USER_ALREADY_EXISTS,
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Register a new user account.
    const createdUser: UserDocument = await Users.create({
      email,
      password: hashedPassword,
      roles: [UserRole.CUSTOMER],
    });

    return {
      user: sanitizeUser(createdUser),
    };
  };

  /**
   * Logins with shop's payload.
   */
  static login = async ({
    email,
    password,
  }: LoginInput): Promise<LoginResult> => {
    // Find user registered with passed-in email.
    const registerUser = await Users.findOne({ email }).lean();

    if (!registerUser) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    // Check if provided password is matched with stored password.
    const passwordIsMatched: boolean = await bcrypt.compare(
      password,
      registerUser.password,
    );

    if (!passwordIsMatched) {
      throw new AuthenticationFailedAppError();
    }

    // Generate a pair of publicKey and privateKey.
    const { privateKey, publicKey }: KeyPair = await createKeyPair();

    const userIdToCreateTokenPair: Types.ObjectId = registerUser._id;

    const authPayload: AuthPayload = {
      userId: userIdToCreateTokenPair.toString(),
      email,
    };

    const tokenPair: TokenPair = await createTokenPair({
      payload: authPayload,
      publicKey,
      privateKey,
    });

    await KeyTokenService.createKeyToken({
      userId: userIdToCreateTokenPair,
      publicKey,
      privateKey,
      refreshToken: tokenPair.refreshToken,
    });

    return {
      user: sanitizeUser(registerUser),
      tokens: tokenPair,
    };
  };

  /**
   * Verifies provided refresh token and generates a pair of tokens.
   *
   * @remarks
   * Ensures that refresh token is used exactly one time to generate a new pair of tokens.
   */
  static refreshToken = async ({
    refreshToken,
  }: RefreshTokenInput): Promise<RefreshTokenResult> => {
    const verifyRefreshToken = async (
      privateKey: string,
    ): Promise<AuthPayload> => {
      try {
        const refreshAuthPayload = await verifyJSONWebToken<AuthPayload>(
          refreshToken,
          privateKey,
        );
        return refreshAuthPayload;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedAppError({
            code: ResCode.REFRESH_TOKEN_EXPIRED,
          });
        } else if (err instanceof jwt.JsonWebTokenError) {
          throw new UnauthorizedAppError({
            code: ResCode.REFRESH_TOKEN_INVALID,
          });
        }

        throw err;
      }
    };

    // Find key token associated to refresh token argument.
    const foundKeyTokenWithUsedRefreshToken =
      await KeyTokenService.findKeyTokenByRefreshTokenUsed({
        refreshToken,
      });

    if (foundKeyTokenWithUsedRefreshToken) {
      // CRITICAL: Detected a user who has reused refresh token.
      const { userId }: AuthPayload = await verifyRefreshToken(
        foundKeyTokenWithUsedRefreshToken.privateKey,
      );
      // Delete all key token instances connected with this user.
      await KeyTokenService.deleteKeyTokenByUserId({ userId });

      throw new ForbiddenAppError({
        code: ResCode.REFRESH_TOKEN_REUSED,
      });
    }

    const currentUsedKeyToken =
      await KeyTokenService.findKeyTokenByRefreshToken({
        refreshToken,
      });

    if (!currentUsedKeyToken) {
      throw new UnauthorizedAppError({
        code: ResCode.REFRESH_TOKEN_NOT_FOUND,
      });
    }

    const refreshAuthPayload: AuthPayload = await verifyRefreshToken(
      currentUsedKeyToken.privateKey,
    );
    const foundUser = await UserService.findUserByEmail(
      refreshAuthPayload.email,
    );

    if (!foundUser) {
      throw new AuthenticationFailedAppError({
        code: ResCode.USER_IS_NOT_REGISTERED,
      });
    }

    // Creates a new pair of keys.
    const keyPair: KeyPair = await createKeyPair();
    const tokenPair: TokenPair = await createTokenPair({
      payload: _.pick(refreshAuthPayload, ["userId", "email"]),
      ...keyPair,
    });

    await KeyTokenService.updateRefreshToken({ refreshToken });

    return {
      user: refreshAuthPayload,
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
}
