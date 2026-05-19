import type { ProductDocument } from "../../domains/product/product.type.ts";
import type { ApiKeyDocument } from "../../models/apikey.model.ts";
import type { AuthPayload } from "../access.type.ts";
import type { KeyTokenLean } from "../keytoken.type.ts";
import type { Locale } from "../locale.type.ts";

declare global {
  namespace Express {
    interface Request {
      apiKeyObj?: ApiKeyDocument;
      userId?: string;
      user?: AuthPayload;
      keyToken?: KeyTokenLean;
      locale?: Locale;
      product?: ProductDocument;
    }
  }
}
