import type { Request, Response } from "express";
import _ from "lodash";

import { ResCode } from "../../../constants/resCode.constants.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import type { ShopParams } from "../../shop/validations/shop.validations.js";
import { ProductService } from "../product.service.js";
import type {
  FindPublishedProducts,
  SearchPublishedProductRequest,
} from "../validations/product.validations.js";

export class PublicProductController {
  /**
   * Searches published products by keyword.
   */
  async searchPublishedProducts(req: Request, res: Response) {
    const query = req.validated?.query as SearchPublishedProductRequest;

    new OKResponse({
      code: ResCode.PRODUCT_SEARCH_PUBLISHED_SUCCESS,
      data: await ProductService.searchPublishedProducts({
        keyword: query.keyword,
        page: query.page,
        limit: query.limit,
      }),
    }).send(req, res);
  }

  /**
   * Returns all published products owned by a shop.
   */
  async findPublishedProductsByShop(req: Request<ShopParams>, res: Response) {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: await ProductService.findPublishedProductsOwnedByShop({
        shopId: req.params.shopId,
      }),
    }).send(req, res);
  }

  /**
   * Returns all published products.
   */
  async findPublishedProducts(req: Request, res: Response) {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: await ProductService.findPublishedProducts(
        _.pick(req.validated?.query as FindPublishedProducts, [
          "page",
          "limit",
          "sortBy",
          "sortOrder",
        ]),
      ),
    }).send(req, res);
  }
}

export const publicProductController = new PublicProductController();
