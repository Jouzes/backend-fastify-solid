import type { Prisma, Gym } from "../../prisma/generated/client.js";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}