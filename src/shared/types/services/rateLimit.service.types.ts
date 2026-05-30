export type RateLimitInput = {
  cooldownKey?: string;
  cooldownSeconds?: number;
  limitKey?: string;
  maxRequests?: number;
  windowSeconds?: number;
};
