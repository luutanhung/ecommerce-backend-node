import type { UserLean } from "../types/access.types.js";

import { transformMongoId } from "../../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../../shared/utils/sanitizer.utils.js";

/**
 * Sanitize user document instance.
 */
export function sanitizeUser(user: UserLean): Partial<UserLean> {
  const sanitizedUser = pickFields(
    [
      "_id",
      "email",
      "phoneNumber",
      "name",
      "nationalId",
      "taxIdentificationNumber",
    ],
    user,
  );

  return transformMongoId(sanitizedUser);
}
