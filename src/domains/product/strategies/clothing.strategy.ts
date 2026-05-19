import { Clothes } from "../../../models/product/clothing.model.js";
import { Products } from "../../../models/product/product.model.js";
import type { CreateClothingInput } from "../product.type.js";

import { ProductStrategy } from "./base-product.strategy.js";

export class ClothingStrategy extends ProductStrategy<CreateClothingInput> {
  override async create(payload: CreateClothingInput) {
    const clothing = await Clothes.create({
      ...payload.productAttributes,
      productShop: payload.productShop,
    });

    return await Products.create({
      ...payload,
      productAttributes: clothing._id,
    });
  }
}
