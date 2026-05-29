import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const ProductCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    categorySlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    categoryDescription: {
      type: String,
      default: "",
      maxlength: 1_000,
    },

    /**
     * Parent category.
     * null = root category.
     */
    categoryParent: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.PRODUCT_CATEGORY,
      default: null,
    },

    /**
     * Full accestor path.
     */
    categoryAncestors: [
      {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_NAME.PRODUCT_CATEGORY,
      },
    ],

    /**
     * Optiona image/banner.
     */
    categoryImage: {
      type: String,
      default: "",
    },

    /**
     * Sort Order in UI.
     */
    categorySortOrder: {
      type: Number,
      default: 0,
    },

    categoryIsActive: {
      type: Boolean,
      default: true,
    },

    /**
     * SEO metadata.
     */
    categorySeo: {
      metaTitle: String,
      metaDescription: String,
    },

    /**
     * Optional stats cache.
     */
    categoryProductCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.PRODUCT_CATEGORIES,
  },
);

export const ProductCategories = model(
  DOCUMENT_NAME.PRODUCT_CATEGORY,
  ProductCategorySchema,
);
