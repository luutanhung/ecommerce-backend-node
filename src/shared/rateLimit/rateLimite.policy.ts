export const RATE_LIMIT_POLICY = {
  ACCESS_SEND_EMAIL_VERIFICATION: {
    cooldownSeconds: 60,
    maxRequests: 10,
    windowSeconds: 24 * 60 * 60,
  },

  ACCESS_PASSWORD_RESET: {
    cooldownSeconds: 60,
    maxRequests: 5,
    windowSeconds: 24 * 60 * 60,
  },

  SHOP_CLOSE: {
    cooldownSeconds: 300,
    maxRequests: 5,
    windowSeconds: 24 * 60 * 60,
  },
} as const;

export const RATE_LIMIT_POLICY_NAME = Object.freeze(
  Object.fromEntries(Object.keys(RATE_LIMIT_POLICY).map((key) => [key, key])),
) as { [K in keyof typeof RATE_LIMIT_POLICY]: K };
