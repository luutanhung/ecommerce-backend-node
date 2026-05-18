import { Products } from "../../../models/product.model.js";
import type { CreateProductInput, ProductDocument } from "../product.type.js";

export class Product<TAttributes> {
  protected readonly payload: CreateProductInput<TAttributes>;

  constructor(payload: CreateProductInput<TAttributes>) {
    this.payload = payload;
  }

  public async createProduct(): Promise<ProductDocument> {
    return await Products.create({
      ...this.payload,
    });
  }
}
