import { ResponseCode } from "../../../constants/response.constants.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { Clothes } from "../../../models/product/clothing.model.js";
import type { CreateProductInput, ProductDocument } from "../product.type.js";

import { Product } from "./product.entity.js";

export type ClothingAttributes = {
  band: string;
  size?: string;
  material?: string;
};

export class Clothing extends Product<ClothingAttributes> {
  constructor(payload: CreateProductInput<ClothingAttributes>) {
    super(payload);
  }

  override async createProduct(): Promise<ProductDocument> {
    const newClothing = await Clothes.create(this.payload.productAttributes);

    if (!newClothing) {
      throw new BadRequestAppError({
        code: ResponseCode.CLOTHING_CREATION_FAILURE,
      });
    }

    return await super.createProduct();
  }
}
