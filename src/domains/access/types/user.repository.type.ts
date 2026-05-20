import type { ClientSession, QueryFilter, UpdateQuery } from "mongoose";

import type { User } from "./access.type.js";

export type UserFilterQuery = QueryFilter<User>;
export type UserUpdateQuery = UpdateQuery<User>;

export type UpdateUserRepositoryInput = {
  query: UserFilterQuery;
  update: UserUpdateQuery;
  session?: ClientSession;
};

export type FindUserRepositoryInput = {
  query?: UserFilterQuery;
};
