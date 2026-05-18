import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";

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
    collection: COLLECTION_NAME,
  },
);

export const KeyTokens = model(DOCUMENT_NAME, KeyTokenSchema);
