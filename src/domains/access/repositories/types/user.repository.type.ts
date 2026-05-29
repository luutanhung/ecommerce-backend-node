import type { QueryFilter, UpdateQuery } from "mongoose";

import type { User } from "../../types/access.types.js";

export type UserFilterQuery = QueryFilter<User>;
export type UserUpdateQuery = UpdateQuery<User>;

export type UpdateUserRepositoryInput = {
  query: UserFilterQuery;
  update: UserUpdateQuery;
};

export type FindUserRepositoryInput = {
  query?: UserFilterQuery;
};
