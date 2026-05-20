import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { ProductType } from "../constants/product.constants.js";

import { ProductSchema } from "../models/product.model.js";

import type { ProductProps } from "../entities/baseProduct.entity.js";
import type { ClothingAttributes } from "../entities/clothing.entity.js";
import type { ElectronicAttributes } from "../entities/electronic.entity.js";
import type { FurnitureAttributes } from "../entities/furniture.entity.js";

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export type Product = InferSchemaType<typeof ProductSchema>;

export type ProductDocument = HydratedDocument<Product>;

export type ProductLean = Product & {
  _id: Types.ObjectId;
};

export type BaseProductAttributes = Record<string, unknown>;

export type CreateProductInput<TAttributes> = Omit<
  ProductProps<TAttributes>,
  "isDraft" | "isPublished"
>;

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
  | CreateElectronicInput
  | CreateFurnitureInput;

export type UpdateShopProductInput = {
  productId: string;
  payload: Record<string, unknown>;
};
