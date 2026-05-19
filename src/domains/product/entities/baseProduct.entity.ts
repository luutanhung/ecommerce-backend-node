import type { Types } from "mongoose";

import { Products } from "../models/product.model.js";

import type {
  CreateProductInput,
  ProductDocument,
} from "../types/product.type.js";

export abstract class Product<TAttributes> {
  protected readonly payload: CreateProductInput<TAttributes>;

  constructor(payload: CreateProductInput<TAttributes>) {
    this.payload = payload;
  }

  protected async createBaseProduct(
    attributesId: Types.ObjectId,
  ): Promise<ProductDocument> {
    return await Products.create({
      ...this.payload,
      _id: attributesId,
    });
  }

  abstract createProduct(): Promise<ProductDocument>;
}
