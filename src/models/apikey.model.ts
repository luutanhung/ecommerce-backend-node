import { Schema, model } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constants.js";
import { CollectionName, DocumentName } from "../constants/model.constants.js";

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
    collection: CollectionName.API_KEYS,
  },
);

export const ApiKeys = model(DocumentName.API_KEY, ApiKeySchema);
