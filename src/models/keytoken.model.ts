import { type InferSchemaType, Schema, model } from "mongoose";

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";

export const keyTokenSchema = new Schema(
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
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export type KeyTokenDocument = InferSchemaType<typeof keyTokenSchema>;

export const KeyTokens = model(DOCUMENT_NAME, keyTokenSchema);
