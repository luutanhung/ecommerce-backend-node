import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

import { Clothing } from "./entities/clothing.entity.js";
import { Electronic } from "./entities/electronic.entity.js";

import { ProductType } from "./product.constants.js";
import type {
  CreateProductFactoryInput,
  ProductDocument,
} from "./product.type.js";

export class ProductFactory {
  static async createProduct(
    payload: CreateProductFactoryInput,
  ): Promise<ProductDocument> {
    switch (payload.productType) {
      case ProductType.CLOTHING: {
        return await new Clothing(payload).createProduct();
      }

      case ProductType.ELECTRONICS: {
        return await new Electronic(payload).createProduct();
      }

      default: {
        throw new BadRequestAppError({
          code: ResCode.PRODUCT_TYPE_INVALID,
        });
      }
    }
  }
}
