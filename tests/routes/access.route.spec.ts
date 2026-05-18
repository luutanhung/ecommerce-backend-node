import { describe, expect, it } from "vitest";

import { request } from "../setup.js";
import {
  generateEmail,
  generateStrongPassword,
  generateUsername,
} from "../test.utils.js";

describe("Test access routes", () => {
  describe("Test /shop/register", () => {
    it("returns positive message when registered new shop successfully", async () => {
      const newShopData = {
        name: generateUsername(),
        email: generateEmail(),
        password: generateStrongPassword(),
      };

      const res = await request.post("/v1/api/shop/register").send(newShopData);
      expect(res.error).toBeFalsy();
      expect(typeof res.body.data.shop._id).toBe("string");
    });
  });
});
