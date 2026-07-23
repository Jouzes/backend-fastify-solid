import type { Prisma, User } from "../../prisma/generated/client.js";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
