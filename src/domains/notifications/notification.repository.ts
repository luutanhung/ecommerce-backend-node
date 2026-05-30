import type {
  CreateNotificationRepositoryInput,
  UpdateNotificationRepositoryInput,
} from "./types/notification.repository.types.js";
import type { NotificationLean } from "./types/notification.types.js";

import type { TransactionOptions } from "../../shared/types/mongoose.type.js";

import { Notifications } from "./notification.model.js";

export class NotificationRepository {
  /**
   * Register new notification.
   */
  static async create(
    input: CreateNotificationRepositoryInput,
    options: TransactionOptions,
  ) {
    const [createdNotification] = await Notifications.create([input], {
      session: options.session,
    });

    if (!createdNotification) return null;

    return createdNotification.toObject();
  }

  /**
   * Update notification.
   */
  static async update({
    query,
    update,
  }: UpdateNotificationRepositoryInput): Promise<NotificationLean | null> {
    return await Notifications.findOneAndUpdate(query, update, {
      runValidators: true,
    }).lean();
  }
}
