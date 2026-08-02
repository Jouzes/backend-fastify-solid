import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-checkIns-repository.js";
import { CheckInHistory } from "../services/checkIn-history.service.js";

export function makecheckInUserHistory() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const service = new CheckInHistory(prismaCheckInsRepository);
  return service;
}