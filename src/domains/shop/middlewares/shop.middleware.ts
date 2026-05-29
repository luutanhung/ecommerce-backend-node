import type { NextFunction, Request, Response } from "express";

import { Shops } from "../models/shop.model.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import type { AccessTokenPayload } from "../../access/types/access.type.js";
import type { ShopParams } from "../validations/shop.validations.js";

/**
 * Ensure shop is owned by user.
 */
export const authorizeShopOwnership = asyncWrapper(
  async (req: Request<ShopParams>, res: Response, next: NextFunction) => {
    const user: AccessTokenPayload = req.user as AccessTokenPayload;
    const shopId: string = req.params.shopId;

    const foundShop = await Shops.findOne({
      shopOwner: toObjectId(user.uid),
      _id: toObjectId(shopId),
    }).lean();

    if (!foundShop) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_NOT_OWNED_BY_USER,
      });
    }

    req.ownedShop = foundShop;

    return next();
  },
);
