import path from "path";

import * as dotenv from "dotenv";
import { cleanEnv, str, port, host } from "envalid";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(import.meta.dirname, `../../env.${NODE_ENV}`),
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  HOST: host({ default: "127.0.0.1" }),
  PORT: port({ default: 3003 }),
});

export { env };
