import mongoose from "mongoose";

import { env } from "../configs/env.js";

export class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }

  async connect() {
    if (env.isDevelopment) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    try {
      await mongoose.connect(env.MONGODB_CONNECTION_STRING);
      console.log("Connected to MongoDB successfully.");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Connected to MongoDB failed", err);
      process.exit(1);
    }
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const connectToDatabase = async (): Promise<Database> => {
  return Database.getInstance();
};
