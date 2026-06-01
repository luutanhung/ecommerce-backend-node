import type { Request, Response } from "express";
import _ from "lodash";

import { ProductService } from "../services/product.service.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import type { ShopLean } from "../../../domains/shop/types/shop.types.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { ParamsRequest } from "../../../shared/types/http.type.js";
import type { AccessTokenPayload } from "../../access/types/access.types.js";
import type { ShopParams } from "../../shop/validations/shop.validations.js";
import { sanitizeProduct } from "../product.sanitizer.js";
import type {
  CreateProductRequest,
  ProductParams,
} from "../validations/product.validations.js";
import type {
  FindPublishedProducts,
  SearchPublishedProductRequest,
} from "../validations/product.validations.js";

class ProductController {
  /**
   * Creates a new product.
   *
   *  @remarks
   * - This method is designed for authenticated routes. `req.user` must contain
   *   the authenticated user's payload with a `userId` property.
   * - The `productShop` field is automatically set to the ID of the currently
   *   authenticated user (shop owner) instead of relying on client input.
   * - On success, a `CreatedResponse` with `ResCode.PRODUCT_CREATION_SUCCESS`
   *   and the created product data is sent to the client.
   */
  async createShopProduct(req: Request, res: Response): Promise<void> {
    const createdProduct = await ProductService.createShopProduct({
      ...(req.body as CreateProductRequest),
      userId: (req.auth as AccessTokenPayload).uid,
      shopId: (req.ownedShop as ShopLean)._id.toString(),
    });

    if (!createdProduct) {
      throw new BadRequestAppError({
        code: ResCode.PRODUCT_CREATION_FAILURE,
      });
    }

    new CreatedResponse({
      code: ResCode.PRODUCT_CREATION_SUCCESS,
      data: sanitizeProduct(createdProduct),
    }).send(req, res);
  }

  /**
   * Update a shop product.
   */
  async updateShopProduct(req: Request, res: Response) {
    const updatedProduct = await ProductService.updateShopProduct({
      productId: (req.validated?.params as ProductParams).productId,
      payload: req.body,
    });

    if (!updatedProduct) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    new OKResponse({
      code: ResCode.PRODUCT_UPDATE_SUCCESS,
      data: sanitizeProduct(updatedProduct),
    }).send(req, res);
  }

  /**
   * Publish a single product.
   */
  async publishShopProduct(
    req: ParamsRequest<ProductParams>,
    res: Response,
  ): Promise<void> {
    new OKResponse({
      code: ResCode.PRODUCT_PUBLISH_SUCCESS,
      data: await ProductService.publishShopProduct({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
        productId: req.params.productId,
      }),
    }).send(req, res);
  }

  /**
   * Unpublish a single product.
   */
  async unpublishShopProduct(
    req: Request<ProductParams>,
    res: Response,
  ): Promise<void> {
    new OKResponse({
      code: ResCode.PRODUCT_UNPUBLISH_SUCCESS,
      data: await ProductService.unpublishShopProduct({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
        productId: req.params.productId,
      }),
    }).send(req, res);
  }

  /**
   * Find a single product by shop.
   */
  async findProductOwnedByShop(
    req: ParamsRequest<ProductParams>,
    res: Response,
  ): Promise<void> {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_SUCCESS,
      data: await ProductService.findProductOwnedByShop({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
        productId: req.params.productId,
      }),
    }).send(req, res);
  }

  /**
   * Finds all draft products by shop id.
   */
  async findDraftProductsOwnedByShop(
    req: Request,
    res: Response,
  ): Promise<void> {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_DRAFT_PRODUCTS_SUCCESS,
      data: await ProductService.findDraftProductsOwnedByShop({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
      }),
    }).send(req, res);
  }

  /**
   * Finds all published products by shop id.
   */
  async findPublishedProductsOwnedByShop(
    req: Request,
    res: Response,
  ): Promise<void> {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: await ProductService.findPublishedProductsOwnedByShop({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
      }),
    }).send(req, res);
  }

  // Public routes.
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

export const productController = new ProductController();
