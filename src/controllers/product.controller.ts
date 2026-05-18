import type { Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";

import { ResCode } from "../constants/resCode.constants.js";

import { ProductService } from "../services/product.service.js";

import type { AuthPayload } from "../types/access.type.js";
import type { BodyRequest } from "../types/http.type.js";

import type { CreateProductRequest } from "../validations/product.validations.js";

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
  createProduct = async (
    req: BodyRequest<CreateProductRequest>,
    res: Response,
  ): Promise<void> => {
    const createdProduct = await ProductService.createProduct({
      ...req.body,
      productShop: (req.user as AuthPayload).userId,
    });

    new CreatedResponse({
      code: ResCode.PRODUCT_CREATION_SUCCESS,
      data: createdProduct,
    }).send(req, res);
  };
}

export const productController = new ProductController();
