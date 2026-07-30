import type { CheckInsRepository } from "../repositories/checkins-repository.js";

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetrics {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async create({userId}: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    return {checkInsCount};
  }
}