/**
 * Queue Names.
 */
export const QUEUE_NAME = {
  EMAIL: "Email",

  SHOP: "Shop",
} as const;

/**
 * Queue Jobs.
 */
export const EMAIL_JOB_NAME = {
  ACCESS_SEND_VERIFICATION_EMAIL: "access-send-verification-email",

  SHOP_SEND_VERIFICATION_EMAIL: "shop-send-verification-email",
} as const;

export const SHOP_JOB_NAME = {
  CLOSE_SHOP: "close-shop",
} as const;
