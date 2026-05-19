import type { NextFunction, Request, Response } from "express";

import { ResCode } from "../../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import type { ShopParams } from "../../../validations/shop.validations.js";
import type { AuthPayload } from "../../access/types/access.type.js";
import { Shops } from "../shop.model.js";

/**
 * Ensure shop is owned by user.
 */
export const authorizeShopOwnership = asyncWrapper(
  async (req: Request<ShopParams>, res: Response, next: NextFunction) => {
    const user: AuthPayload = req.user as AuthPayload;
    const shopId: string = req.params.shopId;

    const foundShop = await Shops.findOne({
      shopOwner: toObjectId(user.userId),
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
