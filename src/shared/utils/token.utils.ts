import jwt from "jsonwebtoken";
import _ from "lodash";

import {
  ACCESS_TOKEN_EXPIRES_IN_DAYS,
  REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "../../domains/access/constants/access.constants.js";
import type {
  AccessTokenPayload,
  CreateTokenPairInput,
  RefreshTokenPayload,
  TokenPair,
} from "../../domains/access/types/access.type.js";

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
 * Creates a pair of access token and refresh token based on public key and private key.
 *
 * @param payload - Information to be encoded
 * @param publicKey - Key to encode access tokenrm
 * @param privateKey - Key to encode refresh token
 *
 * @returns A pair of tokens generated.
 */
export const createTokenPair = async ({
  payload,
  privateKey,
  publicKey,
}: CreateTokenPairInput): Promise<TokenPair> => {
  try {
    const accessToken: string = await jwt.sign(payload, publicKey, {
      algorithm: "HS256",
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_DAYS * 60 * 60 * 24,
    });

    const refreshToken: string = await jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_DAYS * 60 * 60 * 24,
    });

    return { accessToken, refreshToken };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err;
  }
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
