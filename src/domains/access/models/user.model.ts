import { Schema, model } from "mongoose";

import { USER_ROLE } from "../constants/user.constants.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const UserAddressSchema = new Schema({
  addressLine: {
    type: String,
    unique: true,
    required: true,
  },
  ward: {
    type: String,
  },
  district: {
    type: String,
  },
  province: {
    type: String,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
});

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
      required: true,
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
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.CUSTOMER,
      required: true,
    },
    addresses: {
      type: [UserAddressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.USERS,
  },
);

UserSchema.pre("validate", function () {
  if (!this.name || this.name.trim() === "") {
    if (this.email && this.email.includes("@")) {
      const extractedName = this.email.split("@")[0];
      if (extractedName) {
        this.name = extractedName;
      }
    }
  }
});

export const Users = model(DOCUMENT_NAME.USER, UserSchema);
