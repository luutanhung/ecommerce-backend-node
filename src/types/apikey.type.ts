import { type HydratedDocument, type InferSchemaType } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constant.js";

import { apiKeySchema } from "../models/apikey.model.js";

export type ApiKey = InferSchemaType<typeof apiKeySchema>;
export type ApiKeyDocument = HydratedDocument<ApiKey>;

export type ApiKeyPermission =
  (typeof ApiKeyPermission)[keyof typeof ApiKeyPermission];
