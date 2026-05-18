import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps an asynchronous route handler and forwards any rejected promise or throw error to the next middleware.
 *
 * This utility helps eliminate repetitive try/catch blocks
 * in async controllers and ensures errors are handled by the
 * global error handler middleware.
 *
 * @param fn - The asynchronous Express request handler to wrap.
 * @returns A new Express request handler with centralized async error handling.
 */
export const asyncWrapper = <
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
  ) => Promise<unknown>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
