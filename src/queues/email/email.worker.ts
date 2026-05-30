import { Worker } from "bullmq";

import { config } from "../../configs/index.js";
import { InternalSystemError } from "../../core/error/internalSystemError.js";
import { buildVerifyUserEmailTemplate } from "../../domains/access/templates/access.templates.js";
import type {
  VerifyShopPayload,
  VerifyUserPayload,
} from "../../domains/access/types/access.types.js";
import { NOTIFICATION_STATUS } from "../../domains/notifications/notification.constants.js";
import { NotificationService } from "../../domains/notifications/notification.service.js";
import { buildVerifyShopEmailTemplate } from "../../domains/shop/templates/shop.templates.js";
import { MailService } from "../../libs/mail/mail.service.js";
import { bullRedis } from "../../libs/redis/index.js";
import { EMAIL_JOB_NAME } from "../../shared/constants/queue.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { generateVerificationToken } from "../../shared/utils/token.utils.js";
import type {
  AccessSendVerificationEmailJob,
  ShopSendVerificationEmailJob,
} from "../email/types/email.worker.types.js";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    const { notificationId } = job.data as {
      notificationId: string;
    };

    try {
      switch (job.name) {
        case EMAIL_JOB_NAME.ACCESS_SEND_VERIFICATION_EMAIL: {
          const { userId, email, name } =
            job.data as AccessSendVerificationEmailJob;

          const token = generateVerificationToken<VerifyUserPayload>(
            {
              userId,
            },
            config.mail.secret,
          );

          const verificationUrl = `${config.client.url}/access/verify-email?token=${token}`;

          const html = buildVerifyUserEmailTemplate({
            name,
            verificationUrl,
          });

          await MailService.send({
            to: email,
            subject: "Verify your email",
            html,
          });

          await NotificationService.updateNotification({
            notificationId,
            payload: {
              status: NOTIFICATION_STATUS.SENT,
              sentAt: new Date(),
            },
          });

          return;
        }

        case EMAIL_JOB_NAME.SHOP_SEND_VERIFICATION_EMAIL: {
          const { userInfo, shopInfo } =
            job.data as ShopSendVerificationEmailJob;

          const shopVerificationToken =
            generateVerificationToken<VerifyShopPayload>(
              {
                userId: userInfo.userId,
                shopId: shopInfo.shopId,
              },
              config.mail.secret,
            );

          const verificationUrl = `${config.client.url}/shops/verify-email?token=${shopVerificationToken}`;

          const html = buildVerifyShopEmailTemplate({
            shopName: shopInfo.name,
            ownerName: userInfo.name,
            verificationUrl,
          });

          await MailService.send({
            to: userInfo.email,
            subject: "Verify your shop",
            html,
          });

          await NotificationService.updateNotification({
            notificationId,
            payload: {
              status: NOTIFICATION_STATUS.SENT,
              sentAt: new Date(),
            },
          });

          return;
        }

        default:
          throw new InternalSystemError({
            code: ResCode.JOB_NAME_UNKNOWN,
          });
      }
      // eslint-disable-next-line
    } catch (err: any) {
      await NotificationService.updateNotification({
        notificationId,
        payload: {
          status: NOTIFICATION_STATUS.FAILED,
          failedAt: new Date(),
          failureReason: err instanceof Error ? err.message : "Unknown error",
        },
      });

      // Let BullMQ handle retries
      throw err;
    }
  },
  {
    connection: bullRedis,
    concurrency: 10,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on("error", (err) => {
  console.error(err);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
