import type {
  CreateProductFactoryInput,
  ProductType,
} from "./types/product.type.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

import type { Product } from "./entities/baseProduct.entity.js";
import type { ProductCreationStrategy } from "./strategies/baseProduct.strategy.js";

export class ProductFactory {
  private static registry = new Map<
    ProductType,
    ProductCreationStrategy<unknown, Product<unknown>>
  >();

  static register(
    type: ProductType,
    strategy: ProductCreationStrategy<unknown, Product<unknown>>,
  ) {
    this.registry.set(type, strategy);
  }

  static async createProduct(
    payload: CreateProductFactoryInput,
  ): Promise<Product<unknown>> {
    const strategy = this.registry.get(payload.productType);

    if (!strategy) {
      throw new BadRequestAppError({
        code: ResCode.PRODUCT_TYPE_UNSUPPORTED,
      });
    }

    return strategy.create(payload);
  }
}
