import type { ApiKeyDocument } from "../../models/apikey.model.ts";

declare global {
  namespace Express {
    interface Request {
      apiKeyObj?: ApiKeyDocument;
    }
  }
}
