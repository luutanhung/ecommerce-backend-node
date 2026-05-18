import type { Request, Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";

import { ResCode } from "../constants/resCode.constants.js";

import { ProductService } from "../services/product.service.js";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const createdProduct = await ProductService.createProduct(req.body);

    new CreatedResponse({
      code: ResCode.PRODUCT_CREATION_SUCCESS,
      data: createdProduct,
    }).send(res);
  };
}

export const productController = new ProductController();
