import type { Gym } from "../../prisma/generated/client.js";
import type { GymsRepository } from "../repositories/gyms.repository.js";
    
interface LocateNearbyGymRequest {
  userLatitude: number,
  userLongitude: number
}
    
interface LocateNearbyGymResponse {
  gyms: Gym[]
}
    
export class LocateNearbyGym {
  constructor(private gymsRepository: GymsRepository) {}
    
  async create({userLatitude, userLongitude}: LocateNearbyGymRequest): Promise<LocateNearbyGymResponse> {
    const gyms = await this.gymsRepository.findManyNearby({userLatitude, userLongitude});
    return {gyms};
  }
}
    