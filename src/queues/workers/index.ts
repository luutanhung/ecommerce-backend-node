import { connectToDatabase } from "../../dbs/init.mongodb.js";

async function bootstrapWorkers() {
  await connectToDatabase();

  // Register workers.
  await import("../email/email.worker.js");
  await import("../shop/shop.worker.js");

  console.log("Workers started");
}

bootstrapWorkers();
