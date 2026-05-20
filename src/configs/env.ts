import * as dotenv from "dotenv";
import { cleanEnv, host, port, str } from "envalid";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(import.meta.dirname, `../../.env.${NODE_ENV}`),
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  APP_HOST: host({ default: "127.0.0.1" }),
  APP_PORT: port({ default: 20008 }),

  // MongoDB.
  MONGODB_HOST: host(),
  MONGODB_PORT: port({ default: 27017 }),
  MONGODB_USERNAME: str({ default: "" }),
  MONGODB_PASSWORD: str({ default: "" }),
  MONGODB_DBNAME: str({ default: "" }),
  MONGODB_REPLICA_SET: str({ default: "rs0" }),
});

export { env };
