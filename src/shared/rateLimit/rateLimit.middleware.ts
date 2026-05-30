import type { NextFunction, Request, Response } from "express";

import { RateLimitService } from "./rateLimit.service.js";
import type { RATE_LIMIT_POLICY } from "./rateLimite.policy.js";

export const rateLimitMiddleware =
  (
    policy: keyof typeof RATE_LIMIT_POLICY,
    getIdentifier: (req: Request) => string,
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await RateLimitService.enforcePolicy(policy, getIdentifier(req));

    next();
  };
