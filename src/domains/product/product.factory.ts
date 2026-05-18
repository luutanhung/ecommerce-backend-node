import { ResponseCode } from "../../constants/response.constant.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

import {
  Clothing,
  type ClothingAttributes,
} from "./entities/clothing.entity.js";
import {
  Electronic,
  type ElectronicAttributes,
} from "./entities/electronic.entity.js";

import { ProductType } from "./product.constants.js";
import type { CreateProductInput, ProductDocument } from "./product.type.js";

type CreateClothingInput = CreateProductInput<ClothingAttributes> & {
  productType: typeof ProductType.CLOTHING;
};

export type CreateElectronicInput = CreateProductInput<ElectronicAttributes> & {
  productType: typeof ProductType.ELECTRONICS;
};

export type CreateProductFactoryInput =
  | CreateClothingInput
  | CreateElectronicInput;

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
          code: ResponseCode.PRODUCT_TYPE_INVALID,
        });
      }
    }
  }
}
