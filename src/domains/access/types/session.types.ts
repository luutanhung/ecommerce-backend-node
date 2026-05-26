import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { SessionSchema } from "../models/session.model.js";

export type Session = InferSchemaType<typeof SessionSchema>;
export type SessionDocument = HydratedDocument<Session>;
export type SessionLean = Session & {
  _id: Types.ObjectId;
};
