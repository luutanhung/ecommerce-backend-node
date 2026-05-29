import { Schema, model } from "mongoose";

import { ApiKeyPermission } from "../constants/apikey.constants.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

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
    collection: COLLECTION_NAME.API_KEYS,
  },
);

export const ApiKeys = model(DOCUMENT_NAME.API_KEY, ApiKeySchema);
