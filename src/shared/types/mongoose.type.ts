import type { ClientSession } from "mongoose";

export type TransactionOptions = {
  session?: ClientSession;
};
