import { redis } from "../../libs/redis.js";

export class CacheService {
  static async remember<T>(
    key: string,
    ttlSeconds: number,
    callback: () => Promise<T>,
  ): Promise<T> {
    const cached = await redis.get(key);

    if (cached) {
      return JSON.parse(cached) as T;
    }

    const value = await callback();

    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);

    return value;
  }
}
