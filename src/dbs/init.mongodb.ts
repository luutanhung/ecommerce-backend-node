import mongoose from "mongoose";

import { countNumOfConnections } from "../shared/helpers/investigateMongoDBHealth.js";

import { env } from "../configs/env.js";
import { config } from "../configs/index.js";

const MONGODB_MAX_POOL_SIZE: number = 50;

const MONGODB_CONNECTION_STRING =
  `mongodb://${config.db.username}:${config.db.password}` +
  `@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`;

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
      await mongoose.connect(MONGODB_CONNECTION_STRING, {
        maxPoolSize: MONGODB_MAX_POOL_SIZE,
      });
      console.log("Connected to MongoDB successfully.");

      // Check total number of current connections to MongoDB.
      console.log(
        `Number of total connections to MongoDB: ${countNumOfConnections()}`,
      );

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

/**
 * Open a connection to MongoDB.
 */
export const connectToDatabase = async (): Promise<Database> => {
  return Database.getInstance();
};

/**
 * Close all current connections made to MongoDB.
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    // Close all connections managed by Mongoose.
    await mongoose.disconnect();
    console.log(`Mongoose connections closed successfully.`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error during MongoDB disconnnection", err);
    process.exit(1);
  }
};
