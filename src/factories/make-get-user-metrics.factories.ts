import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-checkIns-repository.js";
import { GetUserMetrics } from "../services/get-user-metrics.service.js";

export function makeGetUserMetrics() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetrics(prismaCheckInsRepository);
  return service;
}