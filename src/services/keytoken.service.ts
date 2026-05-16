import type { Types } from "mongoose";

import { KeyTokens } from "../models/keytoken.model.js";

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
  }: {
    userId: Types.ObjectId;
    privateKey: string;
    publicKey: string;
  }) => {
    try {
      const tokens = await KeyTokens.create({
        user: userId,
        privateKey,
        publicKey,
      });

      return tokens ? tokens : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  };
}
