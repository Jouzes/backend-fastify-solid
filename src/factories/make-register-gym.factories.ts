import { PrismaGymsRepository } from "../repositories/prisma/prisma-gyms.repository.js";
import { RegisterGym } from "../services/register-gym.service.js";

export function makeRegisterGyms() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new RegisterGym(prismaGymsRepository);
  return service;
}