import { connectToDatabase } from "../../dbs/init.mongodb.js";

async function bootstrapWorkers() {
  await connectToDatabase();

  await import("../email/email.worker.js");

  console.log("Workers started");
}

bootstrapWorkers();
