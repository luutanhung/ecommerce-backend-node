import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { USER_ROLE } from "../constants/user.constants.js";

import type { UserSchema } from "../models/user.model.js";

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = InferSchemaType<typeof UserSchema>;
export type UserDocument = HydratedDocument<User>;
export type UserLean = User & {
  _id: Types.ObjectId;
};
