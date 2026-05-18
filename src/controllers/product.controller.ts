import type { Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";

import { ResCode } from "../constants/resCode.constants.js";

import { ProductService } from "../services/product.service.js";

import type { AuthPayload } from "../types/access.type.js";
import type { BodyRequest } from "../types/http.type.js";

import type { ProductCreatePayload } from "../validations/product.validations.js";

class ProductController {
  createProduct = async (
    req: BodyRequest<ProductCreatePayload>,
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
