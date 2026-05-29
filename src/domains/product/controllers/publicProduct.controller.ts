import type { Request, Response } from "express";
import _ from "lodash";

import { ProductService } from "../services/product.service.js";

import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { ShopParams } from "../../shop/validations/shop.validations.js";
import { sanitizeProduct } from "../product.sanitizer.js";
import type {
  FindPublishedProducts,
  ProductParams,
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
          "productType",
          "sortBy",
          "sortOrder",
          "page",
          "limit",
        ]),
      ),
    }).send(req, res);
  }

  /**
   * Returns a single published product.
   */
  async findPublishedProduct(req: Request, res: Response) {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: sanitizeProduct(
        await ProductService.findPublishedProduct({
          productId: (req.validated?.params as ProductParams).productId,
        }),
      ),
    }).send(req, res);
  }
}

export const publicProductController = new PublicProductController();
