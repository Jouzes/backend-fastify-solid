import { randomUUID } from "node:crypto";
import type { Prisma, Gym } from "../../../prisma/generated/client.js";
import type { GymsRepository } from "../gyms.repository.js";
import { Decimal } from "@prisma/client/runtime/client";  

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((gym) => gym.id === id) ?? null;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString())
    }; 

    this.items.push(gym);
    return gym;
  }
}
