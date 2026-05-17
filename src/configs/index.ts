import { env } from "./env.js";

const config = {
  development: {
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
    },
  },
  production: {
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
    },
  },
};

const currentConfig = config[env.NODE_ENV as keyof typeof config];

export { currentConfig as config };
