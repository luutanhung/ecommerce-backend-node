import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { CategorySchema } from "../models/category.model.js";

export type Category = InferSchemaType<typeof CategorySchema>;
export type CategoryDocument = HydratedDocument<Category>;
export type CategoryLean = Category & {
  _id: Types.ObjectId;
};
