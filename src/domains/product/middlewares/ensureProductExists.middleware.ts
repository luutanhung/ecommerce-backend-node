import type { NextFunction, Request, Response } from "express";

import type { ProductFilterQuery } from "../types/product.repository.type.js";

import { ResCode } from "../../../constants/resCode.constants.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import type { ProductParams } from "../../../validations/product.validations.js";
import type { AuthPayload } from "../../access/types/access.type.js";
import { ProductRepository } from "../product.repository.js";

/**
 * Ensure product exists.
 */
export const ensureProductExists = asyncWrapper(
  async (req: Request<ProductParams>, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    const query: ProductFilterQuery = {
      productShop: toObjectId((req.user as AuthPayload).userId),
      _id: toObjectId(productId),
    };

    const searchedProduct = await ProductRepository.findProduct({ query });

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
