import { Worker } from "bullmq";

import type { ShopCloseShopJob } from "./types/shop.worker.types.js";

import { InternalSystemError } from "../../core/error/internalSystemError.js";
import { NOTIFICATION_STATUS } from "../../domains/notifications/notification.constants.js";
import { NotificationService } from "../../domains/notifications/notification.service.js";
import { ShopService } from "../../domains/shop/services/shop.service.js";
import { bullRedis } from "../../libs/redis/index.js";
import {
  QUEUE_NAME,
  SHOP_JOB_NAME,
} from "../../shared/constants/queue.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { BaseJob } from "../../shared/types/job.types.js";

export const shopWorker = new Worker(
  QUEUE_NAME.SHOP,
  async (job) => {
    const { notificationId } = job.data as BaseJob;

    try {
      switch (job.name) {
        case SHOP_JOB_NAME.CLOSE_SHOP: {
          const { shopId } = job.data as ShopCloseShopJob;

          await ShopService.performShopClosure({ shopId });

          await NotificationService.updateNotification({
            notificationId,
            payload: {
              status: NOTIFICATION_STATUS.SUCCEEDED,
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
      throw err;
    }
  },
  {
    connection: bullRedis,
  },
);
