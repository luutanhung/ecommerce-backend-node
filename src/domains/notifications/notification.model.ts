import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";

import {
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE,
} from "./notification.constants.js";

export const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(NOTIFICATION_STATUS),
      default: NOTIFICATION_STATUS.PENDING,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    readAt: {
      type: Date,
      default: null,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    failedAt: {
      type: Date,
      default: null,
    },
    failureReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.NOTIFICATIONS,
  },
);

NotificationSchema.index({
  user: 1,
  createdAt: -1,
});

NotificationSchema.index({
  notificationUser: 1,
  notificationStatus: 1,
});

export const Notifications = model(
  DOCUMENT_NAME.NOTIFICATION,
  NotificationSchema,
);
