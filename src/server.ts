import { app } from "./app.js";
import { env } from "./configs/env.js";
import { connectToDatabase } from "./dbs/init.mongodb.js";

const startServer = async () => {
  await connectToDatabase();

  const server = app.listen(env.PORT, env.HOST, () => {
    console.log(`EBN Server is listening on port ${env.HOST}:${env.PORT}`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server is closed out of reason.");
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server is terminated out of reason.");
      process.exit(1);
    });
  });
};

startServer();
