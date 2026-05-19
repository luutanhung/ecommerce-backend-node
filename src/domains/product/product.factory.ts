import type {
  CreateProductFactoryInput,
  ProductDocument,
  ProductType,
} from "./types/product.type.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

import { ProductStrategy } from "./strategies/baseProduct.strategy.js";

export class ProductFactory {
  private static registry = new Map<ProductType, ProductStrategy>();

  static register(type: ProductType, strategy: ProductStrategy) {
    this.registry.set(type, strategy);
  }

  static async createProduct(
    payload: CreateProductFactoryInput,
  ): Promise<ProductDocument> {
    const strategy = this.registry.get(payload.productType);

    if (!strategy) {
      throw new BadRequestAppError({
        code: ResCode.PRODUCT_TYPE_UNSUPPORTED,
      });
    }

    return await strategy.create(payload);
  }
}
