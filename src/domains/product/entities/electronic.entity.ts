import { ResCode } from "../../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { Electronics } from "../../../models/product/electronic.model.js";
import type { CreateProductInput, ProductDocument } from "../product.type.js";

import { Product } from "./product.entity.js";

export type ElectronicAttributes = {
  manufacturer: string;
  model?: string;
  color?: string;
};

export class Electronic extends Product<ElectronicAttributes> {
  constructor(payload: CreateProductInput<ElectronicAttributes>) {
    super(payload);
  }

  override async createProduct(): Promise<ProductDocument> {
    const newElectronic = await Electronics.create(
      this.payload.productAttributes,
    );

    if (!newElectronic) {
      throw new BadRequestAppError({
        code: ResCode.ELECTRONIC_CREATION_FAILURE,
      });
    }

    return await super.createProduct();
  }
}
