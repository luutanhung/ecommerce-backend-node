import { Electronics } from "../../../models/product/electronic.model.js";
import { Products } from "../../../models/product/product.model.js";
import type {
  CreateElectronicInput,
  ProductDocument,
} from "../product.type.js";

import { ProductStrategy } from "./baseProduct.strategy.js";

export class ElectronicStrategy extends ProductStrategy<CreateElectronicInput> {
  override async create(
    payload: CreateElectronicInput,
  ): Promise<ProductDocument> {
    const electronic = await Electronics.create({
      ...payload.productAttributes,
      productShop: payload.productShop,
    });

    return await Products.create({
      ...payload,
      productAttributes: electronic._id,
    });
  }
}
