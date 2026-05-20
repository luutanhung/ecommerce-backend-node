import type { ProductProps } from "../entities/baseProduct.entity.js";
import {
  Electronic,
  type ElectronicAttributes,
} from "../entities/electronic.entity.js";

import { ProductCreationStrategy } from "./baseProduct.strategy.js";

export class ElectronicCreationStrategy extends ProductCreationStrategy<
  ProductProps<ElectronicAttributes>,
  Electronic
> {
  override create(payload: ProductProps<ElectronicAttributes>): Electronic {
    return new Electronic(payload);
  }
}
