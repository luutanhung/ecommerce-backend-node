import type { ApiKeyDocument } from "../../models/apikey.model.ts";
import type { KeyTokenLean } from "../keytoken.type.ts";
import type { Locale } from "../locale.type.ts";

declare global {
  namespace Express {
    interface Request {
      apiKeyObj?: ApiKeyDocument;
      userId?: string;
      keyToken?: KeyTokenLean;
      locale?: Locale;
    }
  }
}
