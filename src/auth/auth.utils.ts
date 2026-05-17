import jwt from "jsonwebtoken";

import type { TokenPair } from "../types/auth.type.js";

/**
 * Creates a pair of access token and refresh token based on public key and private key.
 *
 * @param payload - Information to be encoded
 * @param publicKey - Key to encode access token
 * @param privateKey - Key to encode refresh token
 *
 * @returns A pair of tokens generated.
 */
export const createTokenPair = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  publicKey: string,
  privateKey: string,
): Promise<TokenPair> => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      algorithm: "HS256",
      expiresIn: "2 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err;
  }
};
