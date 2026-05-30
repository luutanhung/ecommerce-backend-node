import * as dotenv from "dotenv";
import { bool, cleanEnv, host, port, str } from "envalid";
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

  // Redis.
  REDIS_HOST: host(),
  REDIS_PORT: port(),

  // Mail.
  SMTP_HOST: host(),
  SMTP_PORT: port(),
  SMTP_USER: str(),
  SMTP_PASSWORD: str(),

  // JWT Secrets.
  JWT_MAIL_SECRET: str(),

  // Logger.
  LOG_LEVEL: str(),
  LOG_TO_FILE: bool({ default: true }),

  // Client.
  CLIENT_URL: str(),
});

export { env };
