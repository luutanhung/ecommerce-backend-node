import { Schema, model } from "mongoose";

import { UserRole } from "../constants/access.constants.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../constants/model.constants.js";

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
    },
    nationalId: {
      // CCCD.
      type: String,
      index: true,
    },
    taxIdentificationNumber: {
      // MST.
      type: String,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.USERS,
  },
);

export const Users = model(DOCUMENT_NAME.USER, UserSchema);
