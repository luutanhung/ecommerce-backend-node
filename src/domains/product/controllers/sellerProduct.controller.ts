import type { Request, Response } from "express";

import { ResCode } from "../../../constants/resCode.constants.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import type { AuthPayload } from "../../../domains/access/types/access.type.js";
import { ProductService } from "../../../domains/product/product.service.js";
import type { ShopLean } from "../../../domains/shop/types/shop.type.js";
import type { ParamsRequest, TypedRequest } from "../../../types/http.type.js";
import type { ShopParams } from "../../shop/validations/shop.validations.js";
import type {
  CreateProductRequest,
  ProductParams,
} from "../validations/product.validations.js";

class SellerProductController {
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
  createProductByShop = async (
    req: TypedRequest<ShopParams, CreateProductRequest>,
    res: Response,
  ): Promise<void> => {
    const createdProduct = await ProductService.createProduct({
      ...req.body,
      productOwner: (req.user as AuthPayload).userId,
      productShop: (req.ownedShop as ShopLean)._id.toString(),
    });

    new CreatedResponse({
      code: ResCode.PRODUCT_CREATION_SUCCESS,
      data: createdProduct,
    }).send(req, res);
  };

  /**
   * Publish a single product.
   */
  publishProductByShop = async (
    req: ParamsRequest<ProductParams>,
    res: Response,
  ): Promise<void> => {
    new OKResponse({
      code: ResCode.PRODUCT_PUBLISH_SUCCESS,
      data: await ProductService.publishProduct({
        shopId: (req.user as AuthPayload).userId,
        productId: req.params.productId,
      }),
    }).send(req, res);
  };

  /**
   * Unpublish a single product.
   */
  unpublishProductByShop = async (
    req: Request<ProductParams>,
    res: Response,
  ): Promise<void> => {
    new OKResponse({
      code: ResCode.PRODUCT_UNPUBLISH_SUCCESS,
      data: await ProductService.unpublishProduct({
        shopId: (req.user as AuthPayload).userId,
        productId: req.params.productId,
      }),
    }).send(req, res);
  };

  /**
   * Find a single product by shop.
   */
  findProductByShop = async (
    req: ParamsRequest<ProductParams>,
    res: Response,
  ): Promise<void> => {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_SUCCESS,
      data: await ProductService.findProduct({
        shopId: (req.user as AuthPayload).userId,
        productId: req.params.productId,
      }),
    }).send(req, res);
  };

  /**
   * Finds all draft products by shop id.
   */
  findDraftProductsByShop = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_DRAFT_PRODUCTS_SUCCESS,
      data: await ProductService.findDraftProductsByShopId({
        shopId: (req?.user as AuthPayload).userId,
      }),
    }).send(req, res);
  };

  /**
   * Finds all published products by shop id.
   */
  findPublishedProductsByShop = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    new OKResponse({
      code: ResCode.PRODUCT_FIND_PUBLISHED_PRODUCTS_SUCCESS,
      data: await ProductService.findPublishedProductByShopId({
        shopId: (req?.user as AuthPayload).userId,
      }),
    }).send(req, res);
  };
}

export const sellerProductController = new SellerProductController();
