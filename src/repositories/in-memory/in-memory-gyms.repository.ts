import { randomUUID } from "node:crypto";
import type { Prisma, Gym } from "../../../prisma/generated/client.js";
import type { GymsRepository } from "../gyms.repository.js";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((gym) => gym.id === id) ?? null;
  }
}
