import type { ClientSession } from "mongoose";

export type TransationOptions = {
  session?: ClientSession;
};
