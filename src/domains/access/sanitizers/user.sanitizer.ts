import type { User, UserLean } from "../types/access.types.js";

import { transformMongoId } from "../../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../../shared/utils/sanitizer.utils.js";

/**
 * Sanitize user document instance.
 */
export function sanitizeUser(user: UserLean): Partial<User> {
  const sanitizedUser = pickFields(
    [
      "_id",
      "email",
      "phoneNumber",
      "name",
      "nationalId",
      "taxIdentificationNumber",
      "addresses",
    ],
    user,
  );

  return transformMongoId(sanitizedUser);
}
