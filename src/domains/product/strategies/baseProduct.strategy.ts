import { Product } from "../entities/baseProduct.entity.js";

export abstract class ProductCreationStrategy<
  TPayload,
  TProduct extends Product<unknown>,
> {
  abstract create(payload: TPayload): TProduct;
}
