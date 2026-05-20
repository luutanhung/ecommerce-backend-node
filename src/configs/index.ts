import { env } from "./env.js";

const baseConfig = {
  app: {
    host: env.APP_HOST,
    port: env.APP_PORT,
  },
  db: {
    host: env.MONGODB_HOST,
    port: env.MONGODB_PORT,
    username: env.MONGODB_USERNAME,
    password: env.MONGODB_PASSWORD,
    name: env.MONGODB_DBNAME,
    replicaSet: env.MONGODB_REPLICA_SET,
  },
};

const config = {
  development: baseConfig,

  test: baseConfig,

  production: baseConfig,
};

const currentConfig = config[env.NODE_ENV as keyof typeof config];

export { currentConfig as config };
