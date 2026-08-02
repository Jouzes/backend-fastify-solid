import { prisma } from "../../lib/prisma.js";
import type { GymCreateInput } from "../../../prisma/generated/models.js";
import type { FindManyNearbyParams, GymsRepository } from "../gyms.repository.js";
import type { Gym } from "../../../prisma/generated/client.js";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    });
    return gym;
  }
  
  async findMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return gyms;
  }

  async findManyNearby({ userLatitude, userLongitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }

  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({data});
    return gym;
  }
    
}