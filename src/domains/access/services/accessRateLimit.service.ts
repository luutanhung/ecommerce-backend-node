import { ACCESS_REDIS_KEY } from "../constants/access.constants.js";

import type { CheckEmailVerificationRateLimitInput } from "./types/accessRateLimit.service.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { redis } from "../../../libs/redis/index.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";

export class AccessRateLimitService {
  private static readonly EMAIL_VERIFICATION_COOLDOWN_SECONDS = 60;

  private static readonly EMAIL_VERIFICATION_MAX_PER_DAY = 10;

  private static readonly EMAIL_VERIFICATION_WINDOW_SECONDS = 24 * 60 * 60;

  static async checkEmailVerificationRateLimit({
    userId,
  }: CheckEmailVerificationRateLimitInput): Promise<void> {
    /**
     * Daily limit.
     */
    const limitKey = `${ACCESS_REDIS_KEY.EMAIL_VERIFICATION_LIMIT}:${userId}`;

    const count = await redis.incr(limitKey);

    if (count === 1) {
      await redis.expire(limitKey, this.EMAIL_VERIFICATION_WINDOW_SECONDS);
    }

    if (count > this.EMAIL_VERIFICATION_MAX_PER_DAY) {
      throw new BadRequestAppError({
        code: ResCode.ACCESS_EMAIL_VERIFICATION_LIMIT_REACHED,
      });
    }

    /**
     * Cooldown.
     */
    const cooldownKey = `${ACCESS_REDIS_KEY.EMAIL_VERIFICATION_COOLDOWN}:${userId}`;

    const cooldownLock = await redis.set(
      cooldownKey,
      "1",
      "EX",
      this.EMAIL_VERIFICATION_COOLDOWN_SECONDS,
      "NX",
    );

    if (!cooldownLock) {
      throw new BadRequestAppError({
        code: ResCode.ACCESS_EMAIL_VERIFICATION_COOL_DOWN,
      });
    }
  }
}
