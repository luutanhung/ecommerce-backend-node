import { Queue } from "bullmq";

import { bullRedis } from "../../libs/redis/index.js";
import { QUEUE_NAME } from "../../shared/constants/queue.constants.js";

export const emailQueue = new Queue(QUEUE_NAME.EMAIL, {
  connection: bullRedis,
});
