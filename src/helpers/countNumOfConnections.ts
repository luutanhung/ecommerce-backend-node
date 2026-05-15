import mongoose from "mongoose";

export const countNumOfConnections = (): void => {
  const numOfConnections: number = mongoose.connections.length;
  console.log(`Number of total connections to MongoDB: ${numOfConnections}`);
};
