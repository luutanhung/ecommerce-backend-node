import { Redis } from "ioredis";

import { config } from "../configs/config.js";

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

export const bullRedis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null, // Required by BullMQ for worker instance.
});

redis.on("ready", () => {
  console.log(
    `[Redis] Main instance connected successfully to ${config.redis.host}:${config.redis.port}`,
  );
});

bullRedis.on("ready", () => {
  console.log(
    `[Redis] BullMQ instance connected successfully to ${config.redis.host}:${config.redis.port}`,
  );
});

redis.on("error", (err) => {
  console.error("[Redis] Main instance error:", err);
});

bullRedis.on("error", (err) => {
  console.error("[Redis] BullMQ instance error:", err);
});
