import type { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import type { UsersRepository } from "../users.repository.js";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({data});
  }
}
