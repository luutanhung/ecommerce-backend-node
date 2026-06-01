import { redis } from "../../libs/redis.js";

export class LockService {
  static async acquire(key: string, ttlSeconds = 10): Promise<boolean> {
    const result = await redis.set(key, 1, "EX", ttlSeconds, "NX");
    return result === "OK";
  }

  static async release(key: string): Promise<void> {
    await redis.del(key);
  }
}
