import jwt from "jsonwebtoken";
import _ from "lodash";

import { config } from "../../configs/index.js";
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
export const generateEmailVerificationToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
      type: "EMAIL_VERIFICATION",
    },
    config.mail.secret,
    {
      expiresIn: "1d",
    },
  );
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
export const verifyJSONWebToken = <T>(
  token: string,
  secretKey: string,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err || _.isUndefined(decoded)) {
        return reject(err);
      }

      resolve(decoded as T);
    });
  });
};
