import type { CreateProductInput, ProductDocument } from "../product.type.js";

export abstract class ProductStrategy<TPayload = CreateProductInput> {
  abstract create(payload: TPayload): Promise<ProductDocument>;
}
