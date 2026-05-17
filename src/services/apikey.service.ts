import { ApiKeys } from "../models/apikey.model.js";

import type { ApiKey } from "../types/apikey.type.js";

/**
 * Return the active document with key equals to value of apiKey argument.
 *
 * @param apiKey - Value of x-api-key header
 * @returns The active document associated with this apiKey
 */
export const findActiveApiKey = async (
  apiKey: string,
): Promise<ApiKey | null> => {
  return await ApiKeys.findOne({ key: apiKey, status: true }).lean();
};
