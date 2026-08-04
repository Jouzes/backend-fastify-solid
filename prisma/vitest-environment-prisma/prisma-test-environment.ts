import { execSync } from "node:child_process";
import { env } from "../../src/env/env.js";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { prisma } from "../../src/lib/prisma.js";

function generateDatabaseURL(schema: string) {
  const url = new URL(env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();

    const databaseURL = generateDatabaseURL(schema);

    env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
        await prisma.$disconnect();
      }
    };
  }
};