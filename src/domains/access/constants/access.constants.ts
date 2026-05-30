export const ACCESS_TOKEN_EXPIRES_IN_DAYS: number = 2;
export const REFRESH_TOKEN_EXPIRES_IN_DAYS: number = 15;

// Rate limiter.
export const EMAIL_VERIFICATION_COOLDOWN_SECONDS: number = 60;
export const EMAIL_VERIFICATION_MAX_REQUESTS: number = 10;
export const EMAIL_VERIFICATION_WINDOW_SECONDS: number = 24 * 60 * 60;

export const ACCESS_REDIS_KEY = {
  EMAIL_VERIFICATION_COOLDOWN: "email-verification-cooldown",
  EMAIL_VERIFICATION_LIMIT: "email-verification-limit",
} as const;
