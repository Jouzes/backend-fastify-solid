import { execSync } from "node:child_process";
import { env } from "../../src/env/env.js";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

function generateDatabaseURL(schema: string) {
  const url = new URL(env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  url.searchParams.set("search_path", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = `schema_${randomUUID().replace(/-/g, "_")}`;
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;
    env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy", {
      env: {
        ...process.env,
        DATABASE_URL: databaseURL,
      },
    });

    return {
      async teardown() {
        const adapter = new PrismaPg({ connectionString: databaseURL });
        const prisma = new PrismaClient({ adapter });
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await prisma.$disconnect();
      }
    };
  }
};