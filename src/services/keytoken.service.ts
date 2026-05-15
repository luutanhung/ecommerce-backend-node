import { KeyToken } from "../models/keytoken.model.js";

export class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await KeyToken.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? publicKeyString : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  };
}
