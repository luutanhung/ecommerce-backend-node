import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import { emailQueue } from "../queues/email/email.queue.js";
import { shopQueue } from "../queues/shop/shop.queue.js";

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(emailQueue), new BullMQAdapter(shopQueue)],
  serverAdapter,
});

export { serverAdapter };
