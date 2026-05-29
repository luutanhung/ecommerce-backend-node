import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const SessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: DOCUMENT_NAME.USER,
      index: true,
    },
    /**
     * Client generated UUID.
     * Stored in localeStorage / mobile secure storage.
     */
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    privateKey: {
      type: String,
      required: true,
      select: false,
    },
    publicKey: {
      type: String,
      required: true,
      select: false,
    },
    /**
     * Increment on every refresh token rotation.
     */
    refreshTokenVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.SESSIONS,
  },
);

SessionSchema.index(
  {
    sessionUser: 1,
    sessionDeviceId: 1,
  },
  {
    unique: true,
  },
);

/**
 * Auto delete expired sessions.
 */
SessionSchema.index(
  {
    expiredAt: 1,
  },
  {
    expireAfterSeconds: 0,
  },
);

export const Sessions = model(DOCUMENT_NAME.SESSION, SessionSchema);
