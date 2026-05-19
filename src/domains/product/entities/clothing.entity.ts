import { ResCode } from "../../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { Clothes } from "../../../models/product/clothing.model.js";
import type { CreateProductInput, ProductDocument } from "../product.type.js";

import { Product } from "./product.entity.js";

export type ClothingAttributes = {
  brand: string;
  size?: string;
  material?: string;
};

export class Clothing extends Product<ClothingAttributes> {
  constructor(payload: CreateProductInput<ClothingAttributes>) {
    super(payload);
  }

  override async createProduct(): Promise<ProductDocument> {
    const newClothing = await Clothes.create({
      ...this.payload.productAttributes,
      productShop: this.payload.productShop,
    });

    if (!newClothing) {
      throw new BadRequestAppError({
        code: ResCode.PRODUCT_CLOTHING_CREATION_FAILURE,
      });
    }

    return await super.createBaseProduct(newClothing._id);
  }
}
