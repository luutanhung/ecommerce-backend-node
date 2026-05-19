import { Schema, model } from "mongoose";

import { UserRole } from "../constants/access.constants.js";

import {
  CollectionName,
  DocumentName,
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
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
    collection: CollectionName.USERS,
  },
);

export const Users = model(DocumentName.USER, UserSchema);
