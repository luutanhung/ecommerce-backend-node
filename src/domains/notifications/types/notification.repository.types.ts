import type { QueryFilter, UpdateQuery } from "mongoose";

import type {
  Notification,
  NotificationStatus,
  NotificationType,
} from "./notification.types.js";

export type CreateNotificationRepositoryInput = {
  userId: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  content: string;
};

export type NotificationFilterQuery = QueryFilter<Notification>;
export type NotificationUpdateQuery = UpdateQuery<Notification>;

export type UpdateNotificationRepositoryInput = {
  query: NotificationFilterQuery;
  update: NotificationUpdateQuery;
};
