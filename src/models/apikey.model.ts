import { Schema, model } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constants.js";

const DOCUMENT_NAME: string = "ApiKey";
const COLLECTION_NAME: string = "ApiKeys";

export const ApiKeySchema = new Schema(
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

export const ApiKeys = model(DOCUMENT_NAME, ApiKeySchema);
