import type { CheckIn } from "../../prisma/generated/client.js";
import { MaxDistanceError } from "../errors/max-distance.error.js";
import { MaxNumberCheckinsError } from "../errors/max-number-checkins.error.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";
import type { CheckInsRepository } from "../repositories/checkins-repository.js";
import type { GymsRepository } from "../repositories/gyms.repository.js";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coord.utilis.js";

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
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
    if (checkInOnSameDay) {
      throw new MaxNumberCheckinsError();
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    });
    return {checkIn};
  }

}