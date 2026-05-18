import { type HydratedDocument, type InferSchemaType } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constants.js";

import { ApiKeySchema } from "../models/apikey.model.js";

export type ApiKey = InferSchemaType<typeof ApiKeySchema>;
export type ApiKeyDocument = HydratedDocument<ApiKey>;

export type ApiKeyPermission =
  (typeof ApiKeyPermission)[keyof typeof ApiKeyPermission];
