import os from "node:os";
import process from "node:process";

import mongoose from "mongoose";
import ms from "ms";
import { formatBytesToMB } from "../utils/bytesFormatter.js";

const CHECK_OVERLOADED_CONNECTIONS_INTERVAL: number = ms("5s");

/**
 * Return the total number of connections to MongoDB.
 *
 * @returns The total number of connections.
 */
export const countNumOfConnections = (): number => {
  const numOfConnections: number = mongoose.connections.length;

  return numOfConnections;
};

/**
 * Check for overloaded connections to MongoDB.
 */
export const checkOverloadedConnections = () => {
  setInterval(() => {
    const numOfConnections: number = countNumOfConnections();

    // Get the number of logical CPU cores.
    const numOfCPUCores: number = os.cpus().length;

    const maxConnections: number = numOfCPUCores * 5;
    if (numOfConnections > maxConnections) {
      console.log("Detected overloaded connections to MongoDB.");
    }

    // Get the total physical memory footprint at a given moment.
    const totalPhysicalMemory: number = process.memoryUsage().rss;
    console.log(
      `Physical memory usage: ${formatBytesToMB(totalPhysicalMemory)}`,
    );
  }, CHECK_OVERLOADED_CONNECTIONS_INTERVAL); // Monitor every 5 seconds.
};
