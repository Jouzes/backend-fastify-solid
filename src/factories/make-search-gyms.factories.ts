import { PrismaGymsRepository } from "../repositories/prisma/prisma-gyms.repository.js";
import { SearchGyms } from "../services/search-gyms.service.js";

export function makeSearchGyms() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new SearchGyms(prismaGymsRepository);
  return service;
}