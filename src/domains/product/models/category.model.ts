import { Schema, model } from "mongoose";
import slugify from "slugify";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: 1_000,
    },

    /**
     * Parent category.
     * null = root category.
     */
    parent: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.CATEGORY,
      default: null,
    },

    /**
     * Full accestor path.
     */
    ancestors: [
      {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_NAME.CATEGORY,
      },
    ],

    /**
     * Optiona image/banner.
     */
    image: {
      type: String,
      default: "",
    },

    /**
     * Sort Order in UI.
     */
    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /**
     * SEO metadata.
     */
    seo: {
      metaTitle: String,
      metaDescription: String,
    },

    /**
     * Optional stats cache.
     */
    productCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.CATEGORIES,
  },
);

CategorySchema.pre("validate", function () {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

export const ProductCategories = model(DOCUMENT_NAME.CATEGORY, CategorySchema);
