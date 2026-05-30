import type { RateLimitInput } from "../types/services/rateLimit.service.types.js";

import { TooManyRequestsAppError } from "../../core/error/tooManyRequestAppError.js";
import { redis } from "../../libs/redis/index.js";

export class RateLimitService {
  static async enforce({
    cooldownKey,
    cooldownSeconds = 60,
    limitKey,
    maxRequests = 5,
    windowSeconds = 24 * 60 * 60,
  }: RateLimitInput): Promise<{
    currentCount?: number;
    retryAfterSeconds?: number;
  }> {
    /**
     * Cooldown.
     */
    if (cooldownKey && cooldownSeconds) {
      const acquired = await redis.set(
        cooldownKey,
        "1",
        "EX",
        cooldownSeconds,
        "NX",
      );

      if (!acquired) {
        const retryAfterSeconds = await redis.ttl(cooldownKey);

        throw new TooManyRequestsAppError({
          data: {
            retryAfterSeconds,
          },
        });
      }

      /**
       * Window limit.
       */
      if (limitKey && maxRequests && windowSeconds) {
        const count = await redis.incr(limitKey);

        if (count === 1) {
          await redis.expire(limitKey, windowSeconds);
        }

        if (count > maxRequests) {
          const retryAfterSeconds = await redis.ttl(limitKey);

          throw new TooManyRequestsAppError({
            data: {
              retryAfterSeconds,
            },
          });
        }

        return {
          currentCount: count,
        };
      }
    }

    return {};
  }

  static async getRemainingTime(key: string): Promise<number> {
    return await redis.ttl(key);
  }

  static async reset(key: string): Promise<void> {
    await redis.del(key);
  }
}
