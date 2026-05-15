import jwt from "jsonwebtoken";

export const createTokenPair = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  privateKey: string,
) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
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
