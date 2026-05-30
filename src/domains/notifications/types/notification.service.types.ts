import type {
  NotificationStatus,
  NotificationType,
} from "./notification.types.js";

export type IssueNotificationInput = {
  userId: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  content: string;
};

export type UpdateNotificationInput = {
  notificationId: string;
  payload: Record<string, unknown>;
};
