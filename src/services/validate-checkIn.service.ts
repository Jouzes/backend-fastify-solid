import dayjs from "dayjs";
import type { CheckIn } from "../../prisma/generated/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";
import type { CheckInsRepository } from "../repositories/checkins-repository.js";
import { LateCheckInValidationError } from "../errors/late-checkIn-validation.error.js";

interface ValidateCheckInUserRequest {
  checkInId: string,
}

interface ValidateCheckInUserResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUser {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async create({checkInId}: ValidateCheckInUserRequest): Promise<ValidateCheckInUserResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes");
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at  = new Date();
    await this.checkInsRepository.save(checkIn);
    
    return {checkIn};
  }

}