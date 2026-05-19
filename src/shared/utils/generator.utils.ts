import crypto from "node:crypto";

import type { KeyPair } from "../../types/utils.type.js";

/**
 * Returns a pair of keys generated using cryto module.
 */
export const createKeyPair = async (): Promise<KeyPair> => {
  const privateKey: string = crypto.randomBytes(64).toString("hex");
  const publicKey: string = crypto.randomBytes(64).toString("hex");

  const keyPair: KeyPair = {
    privateKey,
    publicKey,
  };

  return keyPair;
};
