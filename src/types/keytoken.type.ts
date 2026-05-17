import type { HydratedDocument, InferSchemaType } from "mongoose";

import { keyTokenSchema } from "../models/keytoken.model.js";

export type KeyToken = InferSchemaType<typeof keyTokenSchema>;
export type KeyTokenDocument = HydratedDocument<KeyToken>;
