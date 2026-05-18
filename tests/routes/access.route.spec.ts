import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { request } from "../setup.js";

describe("Test access routes", () => {
  describe("Test /shop/register", () => {
    it("returns positive message when registered new shop successfully", async () => {
      const newShopData = {
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 15,
          pattern: /[A-Za-z0-9!@#$%^&*]/,
        }),
      };

      const res = await request.post("/v1/api/shop/register").send(newShopData);
      expect(res.error).toBeFalsy();
      expect(typeof res.body.data.shop._id).toBe("string");
    });
  });
});
