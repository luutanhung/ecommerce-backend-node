import { ProductFactory } from "../domains/product/product.factory.js";
import type { CreateProductFactoryInput } from "../domains/product/product.type.js";

import type { CreateProductResult } from "../types/product.type.js";

export class ProductService {
  /**
   * Create a new product.
   */
  static createProduct = async (
    createProductFactoryInput: CreateProductFactoryInput,
  ): Promise<CreateProductResult> => {
    return await ProductFactory.createProduct(createProductFactoryInput);
  };
}
