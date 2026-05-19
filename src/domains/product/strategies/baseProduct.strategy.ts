import type {
  CreateProductInput,
  ProductDocument,
} from "../types/product.type.js";

export abstract class ProductStrategy<TPayload = CreateProductInput> {
  abstract create(payload: TPayload): Promise<ProductDocument>;
}
