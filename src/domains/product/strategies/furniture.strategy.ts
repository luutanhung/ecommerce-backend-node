import { Furnitures } from "../../../models/product/furniture.model.js";
import { Products } from "../../../models/product/product.model.js";
import type { CreateFurnitureInput } from "../product.type.js";

import { ProductStrategy } from "./baseProduct.strategy.js";

export class FurnitureStrategy extends ProductStrategy<CreateFurnitureInput> {
  override async create(payload: CreateFurnitureInput) {
    const clothing = await Furnitures.create({
      ...payload.productAttributes,
      productShop: payload.productShop,
    });

    return await Products.create({
      ...payload,
      productAttributes: clothing._id,
    });
  }
}
