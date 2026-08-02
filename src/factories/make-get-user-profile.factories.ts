import { PrismaUsersRepository } from "../repositories/prisma/prisma-users.repository.js";
import { GetUserProfile } from "../services/get-user-profile.service.js";

export function makeGetUsersProfile() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new GetUserProfile(prismaUsersRepository);
  return service;
}