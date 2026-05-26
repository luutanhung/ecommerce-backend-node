import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../constants/model.constants.js";

export const SessionSchema = new Schema(
  {
    sessionUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: DOCUMENT_NAME.USER,
      index: true,
    },
    /**
     * Client generated UUID.
     * Stored in localeStorage / mobile secure storage.
     */
    sessionDeviceId: {
      type: String,
      required: true,
      index: true,
    },
    refreshTokenHash: {
      type: String,
      required: true,
    },
    /**
     * Increment on every refresh token rotation.
     */
    refreshTokenVersion: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.SESSIONS,
  },
);

export const Devices = model(DOCUMENT_NAME.SESSION, SessionSchema);
