import jwt from "jsonwebtoken";
import _ from "lodash";

import type { CreateTokenPairInput, TokenPair } from "../types/access.type.js";

/**
 * Creates a pair of access token and refresh token based on public key and private key.
 *
 * @param payload - Information to be encoded
 * @param publicKey - Key to encode access token
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
      expiresIn: "2 days",
    });

    const refreshToken: string = await jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      expiresIn: "7 days",
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
