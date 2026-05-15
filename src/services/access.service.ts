import crypto from "node:crypto";

import bcrypt from "bcrypt";

import { ShopRole } from "../constants/shop.js";
import { Shop } from "../models/shop.model.js";
import type { SignUpPlayload } from "../types/access.type.js";

export class AccessService {
  static signUp = async ({ name, email, password }: SignUpPlayload) => {
    try {
      const existingShop = await Shop.findOne({ email }).lean();
      if (existingShop) {
        return {
          code: "xxxx",
          message: "Shop has already been registered",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newShop = await Shop.create({
        name,
        email,
        password: hashedPassword,
        roles: [ShopRole.SHOP],
      });

      if (newShop) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log(publicKey, privateKey);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        code: "xxx",
        message: err.message,
        status: "error",
      };
    }
  };
}
