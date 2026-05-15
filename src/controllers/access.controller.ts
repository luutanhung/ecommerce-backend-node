import type { Request, RequestHandler, Response } from "express";

class AccessController {
  signUp: RequestHandler = async (req: Request, res: Response) => {
    return res.json({
      id: 1,
    });
  };
}

export const accessController = new AccessController();
