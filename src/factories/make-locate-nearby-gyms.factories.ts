import { PrismaGymsRepository } from "../repositories/prisma/prisma-gyms.repository.js";
import { LocateNearbyGym } from "../services/locate-nearby-gym.service.js";

export function makeLocateNearbyGyms() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new LocateNearbyGym(prismaGymsRepository);
  return service;
}