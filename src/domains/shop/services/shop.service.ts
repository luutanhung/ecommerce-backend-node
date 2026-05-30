import _ from "lodash";
import { type ClientSession } from "mongoose";

import { Shops } from "../models/shop.model.js";

import type { ShopLean } from "../types/shop.types.js";
import type {
  QueueShopVerificationEmailInput,
  RegisterShopInput,
  UpdateShopInput,
  VerifyShopInput,
} from "./types/shop.service.types.js";

import { config } from "../../../configs/index.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { emailQueue } from "../../../queues/email/email.queue.js";
import type { ShopSendVerificationEmailJob } from "../../../queues/email/types/email.worker.types.js";
import { EMAIL_JOB_NAME } from "../../../shared/constants/queue.constants.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { withTransaction } from "../../../shared/helpers/withTransaction.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { verifyJSONWebToken } from "../../../shared/utils/token.utils.js";
import { USER_ROLE } from "../../access/constants/user.constants.js";
import { UserService } from "../../access/services/user.service.js";
import type { VerifyShopPayload } from "../../access/types/access.types.js";
import {
  NOTIFICATION_CONTENT,
  NOTIFICATION_STATUS,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
} from "../../notifications/notification.constants.js";
import { NotificationService } from "../../notifications/notification.service.js";
import { ShopRepository } from "../repositories/shop.repository.js";

/**
 * @remark Shop service returns sanitized object.
 */
export class ShopService {
  /**
   * Users register their shops.
   */
  static async registerShop(input: RegisterShopInput) {
    return await withTransaction(async (session: ClientSession) => {
      const registeredShop = await ShopRepository.create(input, {
        session,
      });

      if (!registeredShop) {
        throw new BadRequestAppError({
          code: ResCode.SHOP_REGISTER_FAILED,
        });
      }

      await UserService.addRole(
        {
          userId: input.userId,
          role: USER_ROLE.SHOP_OWNER,
        },
        {
          session,
        },
      );

      return registeredShop;
    });
  }

  /**
   * Send email to verify shop.
   */
  static async queueShopVerificationEmail({
    userInfo,
    shopInfo,
  }: QueueShopVerificationEmailInput) {
    const { userId } = userInfo;
    const { shopId } = shopInfo;

    const issuedNotification = await NotificationService.issueNotification({
      userId: userInfo.userId,
      type: NOTIFICATION_TYPE.SHOP_VERIFY_EMAIL_SENT,
      title: NOTIFICATION_TITLE.SHOP_VERIFY_EMAIL,
      content: NOTIFICATION_CONTENT.SHOP_VERIFY_EMAIL,
      status: NOTIFICATION_STATUS.PENDING,
    });

    const jobData: ShopSendVerificationEmailJob = {
      userInfo,
      shopInfo,
      notificationId: issuedNotification._id.toString(),
    };

    await emailQueue.add(EMAIL_JOB_NAME.SHOP_SEND_VERIFICATION_EMAIL, jobData, {
      jobId: `${userId}-${shopId}-verify-email`,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
      removeOnComplete: 100,
      removeOnFail: 100,
    });
  }

  /**
   * Verify shop.
   */
  static async verifyShop({ token }: VerifyShopInput) {
    const { userId, shopId } = await verifyJSONWebToken<VerifyShopPayload>({
      token,
      secret: config.mail.secret,
      expiredCode: ResCode.SHOP_EMAIL_VERIFICATION_TOKEN_EXPIRED,
      invalidCode: ResCode.SHOP_EMAIL_VERIFICATION_TOKEN_INVALID,
    });

    const shop = await Shops.findOne({
      user: toObjectId(userId),
      _id: toObjectId(shopId),
    });

    if (!shop) {
      throw new NotFoundAppError({
        code: ResCode.SHOP_NOT_FOUND,
      });
    }

    if (shop.isVerified) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_ALREADY_VERIFIED,
      });
    }

    shop.isVerified = true;
    await shop.save();

    return shop.toObject();
  }

  /**
   * Change shop's details.
   */
  static async updateShopInformation(input: UpdateShopInput) {
    const { shopId, ...payload } = input;

    const updatedShop = await ShopRepository.update({
      query: {
        _id: toObjectId(shopId),
      },
      update: _.pickBy(payload, _.identity),
    });

    if (!updatedShop) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_UPDATE_INFORMATION_FAILURE,
      });
    }

    return updatedShop;
  }

  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    const query = { email };

    return await ShopRepository.findOne({ query });
  };
}
