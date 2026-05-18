import type { Request, Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";

import { ResponseCode } from "../constants/response.constant.js";

import { ProductFactory } from "../domains/product/product.factory.js";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const createdProduct = await ProductFactory.createProduct(req.body);

    new CreatedResponse({
      code: ResponseCode.PRODUCT_CREATION_SUCCESS,
      data: createdProduct,
    }).send(res);
  };
}

export const productController = new ProductController();
