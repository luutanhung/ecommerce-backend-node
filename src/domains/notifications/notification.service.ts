import type {
  IssueNotificationInput,
  UpdateNotificationInput,
} from "./types/notification.service.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { NotificationRepository } from "./notification.repository.js";

export class NotificationService {
  /**
   * Issue a new notification.
   */
  static async issueNotification(input: IssueNotificationInput) {
    const createdNotification = await NotificationRepository.create(input);

    if (!createdNotification) {
      throw new BadRequestAppError({
        code: ResCode.NOTIFICATION_CREATE_FAILED,
      });
    }

    return createdNotification;
  }

  /**
   * Update notification.
   */
  static async updateNotification({
    notificationId,
    payload,
  }: UpdateNotificationInput) {
    const updatedNotification = await NotificationRepository.update({
      query: {
        _id: toObjectId(notificationId),
      },
      update: payload,
    });

    if (!updatedNotification) {
      throw new NotFoundAppError({
        code: ResCode.NOTIFICATION_NOT_FOUND,
      });
    }

    return updatedNotification;
  }
}
