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
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
  mail: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
  },
  jwt: {
    mailSecret: env.JWT_MAIL_SECRET,
  },
  logger: {
    level: env.LOG_LEVEL,
  },
  client: {
    url: env.CLIENT_URL,

    routes: {
      verifyEmail: "/access/verify-email",
      resetPassword: "/access/reset-password",
    },
  },
  payment: {
    // VNPay.
    vnpay: {
      tmnCode: env.VNPAY_TMNCODE,
      secret: env.VNPAY_SECURE_SECRET,
      testMode: env.VNPAY_TEST_MODE,
    },
    // Stripe.
    stripe: {
      secretKey: env.STRIPE_SECRET_KEY,
      webhookSecret: env.STRIPE_WEBHOOK_SECRET,
      publishableKey: env.STRIPE_PUBLISHABLE_KEY,
    },
  },
};

const config = {
  development: baseConfig,

  test: baseConfig,

  production: baseConfig,
};

const currentConfig = config[env.NODE_ENV as keyof typeof config];

export { currentConfig as config };
