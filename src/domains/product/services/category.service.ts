import _ from "lodash";
import type { Types } from "mongoose";
import slugify from "slugify";

import { Categories } from "../models/category.model.js";

import type { CategoryLean } from "../types/category.types.js";
import type { CreateCategoryInput } from "./types/category.service.types.js";

import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";

export class CategoryService {
  /**
   * Create new category.
   */
  static async createCategory({
    name,
    slug,
    description,
    parentId,
    image,
  }: CreateCategoryInput): Promise<CategoryLean> {
    const categorySlug = _.isUndefined(slug)
      ? slug
      : slugify(name, {
          lower: true,
          strict: true,
        });

    let ancestors: Types.ObjectId[] = [];

    if (parentId) {
      const parent = await Categories.findOne({
        _id: toObjectId(parentId),
      });

      if (!parent) {
        throw new NotFoundAppError({
          code: ResCode.CATEGORY_NOT_FOUND,
        });
      }

      ancestors = [...parent.ancestors, parent._id];
    }

    const category = await Categories.create({
      name,
      slug: categorySlug,
      description,
      image,
      parent: parentId,
      ancestors,
    });

    return category.toObject();
  }
}
