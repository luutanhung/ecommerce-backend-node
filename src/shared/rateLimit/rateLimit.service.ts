import type { RateLimitInput } from "../types/services/rateLimit.service.types.js";

import { TooManyRequestsAppError } from "../../core/error/tooManyRequestAppError.js";
import { redis } from "../../libs/redis/index.js";

import { RATE_LIMIT_POLICY } from "./rateLimite.policy.js";

export class RateLimitService {
  static async enforcePolicy(
    policyName: keyof typeof RATE_LIMIT_POLICY,
    identifier: string,
  ) {
    const policy = RATE_LIMIT_POLICY[policyName];

    return this.enforce({
      cooldownKey: `rate-limit:${policyName}:cooldown:${identifier}`,
      cooldownSeconds: policy.cooldownSeconds,

      limitKey: policy.maxRequests
        ? `rate-limit:${policyName}:limit:${identifier}`
        : undefined,

      maxRequests: policy.maxRequests,
      windowSeconds: policy.windowSeconds,
    });
  }

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
