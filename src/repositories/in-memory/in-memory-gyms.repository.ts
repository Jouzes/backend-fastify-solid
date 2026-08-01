import { randomUUID } from "node:crypto";
import type { Prisma, Gym } from "../../../prisma/generated/client.js";
import type { FindManyNearbyParams, GymsRepository } from "../gyms.repository.js";
import { Decimal } from "@prisma/client/runtime/client";  
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coord.utilis.js";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((gym) => gym.id === id) ?? null;
  }

  async findMany(query: string, page: number) {
    return this.items.filter((item) => item.title.includes(query)).slice((page -1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates({latitude: params.userLatitude, longitude: params.userLongitude}, {latitude: Number(item.latitude), longitude: Number(item.longitude)});
      return distance < 10;
    });
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
