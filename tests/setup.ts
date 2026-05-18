import type { Server } from "http";
import supertest from "supertest";
import { afterAll, afterEach, beforeAll } from "vitest";

import { disconnectFromDatabase } from "../src/dbs/init.mongodb.js";
import { startServer } from "../src/server.js";

import { dropCollections } from "./database.js";

let server: Server;
let request: ReturnType<typeof supertest.agent>;

beforeAll(async () => {
  const startServerResult = await startServer();
  server = startServerResult.server;
  request = supertest.agent(startServerResult.app);
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
  server.close();
});

export { request };
