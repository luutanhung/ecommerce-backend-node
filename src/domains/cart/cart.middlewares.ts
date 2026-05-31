import type { NextFunction, Request, Response } from "express";

import { Carts } from "./models/cart.model.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import type { AccessTokenPayload } from "../access/types/access.types.js";

import { CART_STATE } from "./cart.contants.js";

export const ensureCartExists = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.auth as AccessTokenPayload).uid;
    const cartId = req.params.cartId || req.body.cartId;

    const cart = await Carts.findOne({
      _id: toObjectId(cartId),
      user: toObjectId(userId),
      state: CART_STATE.ACTIVE,
    }).lean();

    if (!cart) {
      throw new BadRequestAppError({
        code: ResCode.CART_NOT_FOUND,
      });
    }

    next();
  },
);
