import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import {
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE,
} from "../notification.constants.js";
import { NotificationSchema } from "../notification.model.js";

export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
export type NotificationStatus =
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

export type Notification = InferSchemaType<typeof NotificationSchema>;
export type NotificationDocument = HydratedDocument<Notification>;
export type NotificationLean = Notification & {
  _id: Types.ObjectId;
};
