import type { ProductLean } from "../../domains/product/product.type.ts";
import type { ShopLean } from "../../domains/shop/types/shop.type.ts";
import type { ApiKeyDocument } from "../../models/apikey.model.ts";
import type { AuthPayload } from "../access.type.ts";
import type { KeyTokenLean } from "../keytoken.type.ts";
import type { Locale } from "../locale.type.ts";

declare global {
  namespace Express {
    interface Request {
      apiKeyObj?: ApiKeyDocument;
      locale?: Locale;

      // Access.
      userId?: string;
      user?: AuthPayload;
      keyToken?: KeyTokenLean;

      // Shop.
      ownedShop?: ShopLean;

      // Product.
      product?: ProductLean;
    }
  }
}
