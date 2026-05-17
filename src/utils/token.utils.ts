import jwt from "jsonwebtoken";

import type {
  CreateTokenPairPayload,
  TokenPair,
} from "../types/access.type.js";

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
  payload: CreateTokenPairPayload,
  publicKey: string,
  privateKey: string,
): Promise<TokenPair> => {
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
