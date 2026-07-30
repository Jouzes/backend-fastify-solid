import type { CheckIn } from "../../prisma/generated/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";
import type { CheckInsRepository } from "../repositories/checkins-repository.js";
import type { GymsRepository } from "../repositories/gyms.repository.js";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coord.utilis.js";
import { Decimal } from "@prisma/client/runtime/client";

interface CheckInUserRequest {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitude: number
}

interface CheckInUserResponse {
  checkIn: CheckIn
}

export class CheckInUser {
  constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

  async create({userId, gymId, userLatitude, userLongitude}: CheckInUserRequest): Promise<CheckInUserResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates({latitude: userLatitude, longitude: userLongitude}, {latitude: Number(gym.latitude), longitude: Number(gym.longitude)});
    const MAX_DISTANCE = 0.1;
    if (distance > MAX_DISTANCE) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
    if (checkInOnSameDay) {
      throw new Error;
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    });
    return {checkIn};
  }

}