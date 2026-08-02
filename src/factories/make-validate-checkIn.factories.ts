import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-checkIns-repository.js";
import { ValidateCheckInUser } from "../services/validate-checkIn.service.js";

export function makeValidateCheckInUsers() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInUser(checkInsRepository);
  return service;
}