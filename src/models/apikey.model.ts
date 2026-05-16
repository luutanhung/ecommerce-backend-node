import { type InferSchemaType, Schema, model } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constant.js";

const DOCUMENT_NAME: string = "ApiKey";
const COLLECTION_NAME: string = "ApiKeys";

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: Object.values(ApiKeyPermission),
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export type ApiKeyDocument = InferSchemaType<typeof apiKeySchema>;

export const ApiKeys = model(DOCUMENT_NAME, apiKeySchema);
