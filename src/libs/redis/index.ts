import { Redis } from "ioredis";

import { config } from "../../configs/index.js";

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

export const bullRedis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null, // Required by BullMQ for worker instance.
});
