import { Clothes } from "../models/clothing.model.js";
import { Products } from "../models/product.model.js";

import type { CreateClothingInput } from "../types/product.type.js";

import { ProductStrategy } from "./baseProduct.strategy.js";

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
