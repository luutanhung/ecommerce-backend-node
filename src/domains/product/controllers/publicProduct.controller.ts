import type { Request, Response } from "express";

import { ResCode } from "../../../constants/resCode.constants.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import type { ShopParams } from "../../shop/validations/shop.validations.js";
import { ProductService } from "../product.service.js";

export class PublicProductController {
  /**
   * Returns published product by shop.
   */
  async findPublishedProducts(req: Request<ShopParams>, res: Response) {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: await ProductService.findPublishedProductsByShopId({
        shopId: req.params.shopId,
      }),
    }).send(req, res);
  }
}

export const publicProductController = new PublicProductController();
