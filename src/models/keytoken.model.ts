import { Schema, model } from "mongoose";

import { CollectionName, DocumentName } from "../constants/model.constants.js";

export const KeyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: CollectionName.KEY_TOKENS,
  },
);

export const KeyTokens = model(DocumentName.KEY_TOKEN, KeyTokenSchema);
