import { Queue } from "bullmq";

import { bullRedis } from "../../libs/redis.js";
import { QUEUE_NAME } from "../../shared/constants/queue.constants.js";

export const shopQueue = new Queue(QUEUE_NAME.SHOP, {
  connection: bullRedis,
});
