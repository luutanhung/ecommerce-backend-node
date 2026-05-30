export const ACCESS_TOKEN_EXPIRES_IN_DAYS: number = 2;
export const REFRESH_TOKEN_EXPIRES_IN_DAYS: number = 15;

export const ACCESS_REDIS_KEY = {
  EMAIL_VERIFICATION_COOLDOWN: "email-verification-cooldown",
  EMAIL_VERIFICATION_LIMIT: "email-verification-limit",
} as const;
