import type { CheckIn } from "../../prisma/generated/client.js";
import type { CheckInsRepository } from "../repositories/checkins-repository.js";

interface CheckInHistoryRequest {
  userId: string,
  page: number
}

interface CheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class CheckInHistory {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async create({userId, page}: CheckInHistoryRequest): Promise<CheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);
    return {checkIns};
  }
}