import jwt from "jsonwebtoken";

import type { VerifyJSONWebTokenInput } from "../types/token.utils.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import {
  ACCESS_TOKEN_EXPIRES_IN_DAYS,
  REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "../../domains/access/constants/access.constants.js";
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "../../domains/access/types/access.types.js";

/**
 * Generate access token.
 */
export const generateAccessToken = async (
  payload: AccessTokenPayload,
  privateKey: string,
) => {
  return await jwt.sign(payload, privateKey, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_DAYS * 60 * 60 * 24,
  });
};

/**
 * Generate email verficiation token.
 */
export const generateVerificationToken = <
  TPlayload extends Record<string, unknown>,
>(
  payload: TPlayload,
  secret: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

/**
 * Generate refresh token.
 */
export const generateRefreshToken = async (
  payload: RefreshTokenPayload,
  privateKey: string,
) => {
  return await jwt.sign(payload, privateKey, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN_DAYS * 60 * 60 * 24,
  });
};

/**
 * Verifies a JSON Web Token with a key secret.
 *
 * @param token - Token to verify
 * @param secretKey - Secret to be used to verify token.
 */
export const verifyJSONWebToken = <TPayload>({
  token,
  secret,
  expiredCode,
  invalidCode,
}: VerifyJSONWebTokenInput): Promise<TPayload> => {
  try {
    const decoded = jwt.verify(token, secret) as TPayload;
    return Promise.resolve(decoded);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new BadRequestAppError({
        code: expiredCode,
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      throw new BadRequestAppError({
        code: invalidCode,
      });
    }

    throw err;
  }
};
