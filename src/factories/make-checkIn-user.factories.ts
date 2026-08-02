import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-checkIns-repository.js";
import { PrismaGymsRepository } from "../repositories/prisma/prisma-gyms.repository.js";
import { CheckInUser } from "../services/checkin-user.service.js";

export function makeCheckInUser() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new CheckInUser(prismaCheckInsRepository, prismaGymsRepository);
  return service;
}