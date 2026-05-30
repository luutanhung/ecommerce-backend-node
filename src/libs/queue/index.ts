import { Queue } from "bullmq";

import { QUEUE_NAME } from "../../shared/constants/queue.constants.js";
import { redisConnection } from "../redis/index.js";

export const emailQueue = new Queue(QUEUE_NAME.EMAIL, {
  connection: redisConnection,
});
