import type { Request, RequestHandler, Response } from "express";

import { AccessService } from "../services/access.service.js";

class AccessController {
  signUp: RequestHandler = async (req: Request, res: Response) => {
    try {
      return res.status(201).json(await AccessService.signUp(req.body));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        code: "5xx",
        message: err.message,
      });
    }
  };
}

export const accessController = new AccessController();
