import jwt from "jsonwebtoken";

/**
 * Creates a pair of access token and refresh token based on public key and private key.
 *
 * @param payload - Information to be encoded
 * @param publicKey - Key to encode access token
 * @param privateKey - Key to encode refresh token
 */
export const createTokenPair = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  publicKey: string,
  privateKey: string,
) => {
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
