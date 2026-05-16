import { type InferSchemaType } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constant.js";

import { apiKeySchema } from "../models/apikey.model.js";

export type ApiKeyPermission =
  (typeof ApiKeyPermission)[keyof typeof ApiKeyPermission];

export type ApiKeyDocument = InferSchemaType<typeof apiKeySchema>;
