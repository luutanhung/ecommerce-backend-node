import { env } from "./configs/env.js";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./dbs/init.mongodb.js";
import { checkOverloadedConnections } from "./helpers/investigateMongoDBHealth.js";

import { app } from "./app.js";

const startServer = async () => {
  /**
   * Shutdown application server gracefully.
   *
   * @param signal - Standard POSIX signals
   */
  async function shutdownServerGracefully(signal: string) {
    console.log(`Received signal: ${signal}`);

    console.log(`Closing MongoDB connections.`);
    disconnectFromDatabase();

    server.close(() => {
      console.log("Server is about to close.");
      process.exit(1);
    });
  }

  await connectToDatabase();

  /**
   * Monitor MongoDB connection status.
   */
  checkOverloadedConnections();

  const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `EBN Server is listening on port ${env.APP_HOST}:${env.APP_PORT}`,
    );
  });

  process.on("SIGINT", () => shutdownServerGracefully("SIGINT"));
  process.on("SIGTERM", () => shutdownServerGracefully("SIGTERM"));
};

startServer();
