import { PrismaUsersRepository } from "../repositories/prisma/prisma-users.repository.js";
import { AuthenticateUser } from "../services/authenticate-user.service.js";

export function makeAuthenticateUsers() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new AuthenticateUser(prismaUsersRepository);
  return service;
}