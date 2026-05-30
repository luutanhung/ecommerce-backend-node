import type { NextFunction, Request, Response } from "express";

import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import type { AccessTokenPayload } from "../../access/types/access.types.js";
import { ProductRepository } from "../repositories/product.repository.js";
import type { ProductFilterQuery } from "../repositories/types/product.repository.type.js";

/**
 * Ensure product exists.
 */
export const ensureProductExists = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId || req.body.productId;

    const query: ProductFilterQuery = {
      productShop: toObjectId((req.auth as AccessTokenPayload).uid),
      _id: toObjectId(productId),
    };

    const searchedProduct = await ProductRepository.findOne({ query });

    if (!searchedProduct) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    // Attach product to the request object.
    req.product = searchedProduct;

    return next();
  },
);
