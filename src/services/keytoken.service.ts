import type { Types } from "mongoose";

import { KeyToken } from "../models/keytoken.model.js";

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
  }: {
    userId: Types.ObjectId;
    publicKey: string;
  }) => {
    try {
      const tokens = await KeyToken.create({
        user: userId,
        publicKey,
      });

      return tokens ? tokens.publicKey : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  };
}
