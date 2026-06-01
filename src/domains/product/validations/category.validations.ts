import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { createObjectIdSchema } from "../../../shared/validations/common.validations.js";

export const CategoryId = createObjectIdSchema({
  requiredMessage: ResCode.CATEGORY_ID_REQUIRED,
  invalidMessage: ResCode.CATEGORY_ID_INVALID,
});
