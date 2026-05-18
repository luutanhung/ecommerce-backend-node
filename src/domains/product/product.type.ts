import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { ProductSchema } from "../../models/product/product.model.js";

import { ProductType } from "./product.constants.js";

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export type Product = InferSchemaType<typeof ProductSchema>;

export type ProductDocument = HydratedDocument<Product>;

export type ProductLean = Product & {
  _id: Types.ObjectId;
};

export type BaseProductAttributes = Record<string, unknown>;

export type CreateProductInput<TAttributes = BaseProductAttributes> = {
  productName: string;

  productThumb: string;

  productDescription: string;

  productPrice: number;

  productQuantity: number;

  productType: ProductType;

  productShop: Types.ObjectId;

  productAttributes: TAttributes;
};
