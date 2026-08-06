import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client.js";
import { env } from "../env/env.js";

let _prisma: PrismaClient | null = null;
let _currentUrl: string | null = null;

function getPrisma(): PrismaClient {
  const currentUrl = process.env.DATABASE_URL || env.DATABASE_URL;
  if (!_prisma || _currentUrl !== currentUrl) {
    const adapter = new PrismaPg({ connectionString: currentUrl });
    _prisma = new PrismaClient({
      adapter,
      log: env.NODE_ENV === "dev" ? ["query"] : []
    });
    _currentUrl = currentUrl;
  }
  return _prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string) {
    const instance = getPrisma();
    const value = (instance as any)[prop];
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  }
});
