import { PrismaUsersRepository } from "../repositories/prisma/prisma-users.repository.js";
import { RegisterUser } from "../services/register-user.service.js";

export function makeRegisterUsers() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new RegisterUser(prismaUsersRepository);
  return service;
}