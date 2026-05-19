import type { QueryFilter } from "mongoose";

import type { User } from "./access.type.js";

export type UserFilterQuery = QueryFilter<User>;

export type FindUserRepositoryInput = {
  query?: UserFilterQuery;
};
