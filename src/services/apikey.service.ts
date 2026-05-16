import { type ApiKeyDocument, ApiKeys } from "../models/apikey.model.js";

/**
 * Return the active document with key equals to value of apiKey argument.
 *
 * @param apiKey - Value of x-api-key header
 * @returns The active document associated with this apiKey
 */
export const findActiveApiKey = async (
  apiKey: string,
): Promise<ApiKeyDocument | null> => {
  const apiKeyObj = await ApiKeys.findOne({ key: apiKey, status: true }).lean();
  return apiKeyObj;
};
