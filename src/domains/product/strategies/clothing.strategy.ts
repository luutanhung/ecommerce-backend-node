import type { ProductProps } from "../entities/baseProduct.entity.js";
import {
  Clothing,
  type ClothingAttributes,
} from "../entities/clothing.entity.js";

import { ProductCreationStrategy } from "./baseProduct.strategy.js";

export class ClothingCreationStrategy extends ProductCreationStrategy<
  ProductProps<ClothingAttributes>,
  Clothing
> {
  override create(payload: ProductProps<ClothingAttributes>): Clothing {
    return new Clothing(payload);
  }
}

// export class ClothingStrategy extends ProductStrategy<CreateClothingInput> {
//   override async create(payload: CreateClothingInput) {
//     const clothing = await Clothes.create({
//       ...payload.productAttributes,
//       productShop: payload.productShop,
//     });

//     return await Products.create({
//       ...payload,
//       productAttributes: clothing._id,
//     });
//   }
// }
