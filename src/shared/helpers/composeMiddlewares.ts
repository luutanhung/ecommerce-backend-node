import type { NextFunction, Request, RequestHandler, Response } from "express";

export const composeMiddlewares = (
  middlewares: RequestHandler[],
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let index = 0;

    const run = async (err?: unknown): Promise<void> => {
      if (err) {
        return next(err);
      }

      const middleware = middlewares[index++];

      if (!middleware) {
        return next();
      }

      try {
        await Promise.resolve(middleware(req, res, run));
      } catch (error) {
        next(error);
      }
    };

    await run();
  };
};
