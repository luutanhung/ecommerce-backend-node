import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { ProductSchema } from "../../models/product/product.model.js";

import type { ClothingAttributes } from "./entities/clothing.entity.js";
import type { ElectronicAttributes } from "./entities/electronic.entity.js";
import type { FurnitureAttributes } from "./entities/furniture.entity.js";

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

  productDescription?: string;

  productPrice: number;

  productQuantity: number;

  productType: ProductType;

  productShop: string;

  productAttributes: TAttributes;
};

export type CreateClothingInput = CreateProductInput<ClothingAttributes> & {
  productType: typeof ProductType.CLOTHING;
};

export type CreateElectronicInput = CreateProductInput<ElectronicAttributes> & {
  productType: typeof ProductType.ELECTRONICS;
};

export type CreateFurnitureInput = CreateProductInput<FurnitureAttributes> & {
  productType: typeof ProductType.FURNITURE;
};

export type CreateProductFactoryInput =
  | CreateClothingInput
  | CreateElectronicInput;
