import type { ProductProps } from "../entities/baseProduct.entity.js";
import {
  Furniture,
  type FurnitureAttributes,
} from "../entities/furniture.entity.js";

import { ProductCreationStrategy } from "./baseProduct.strategy.js";

export class FurnitureCreationStrategy extends ProductCreationStrategy<
  ProductProps<FurnitureAttributes>,
  Furniture
> {
  override create(payload: ProductProps<FurnitureAttributes>): Furniture {
    return new Furniture(payload);
  }
}
