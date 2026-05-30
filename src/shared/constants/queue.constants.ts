/**
 * Queue Names.
 */
export const QUEUE_NAME = {
  EMAIL: "email",
} as const;

/**
 * Queue Jobs.
 */
export const EMAIL_JOB_NAME = {
  ACCESS_SEND_VERIFICATION_EMAIL: "access-send-verification-email",

  SHOP_SEND_VERIFICATION_EMAIL: "shop-send-verification-email",
} as const;
