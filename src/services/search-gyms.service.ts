import type { Gym } from "../../prisma/generated/client.js";
import type { GymsRepository } from "../repositories/gyms.repository.js";

interface SearchGymsRequest {
  query: string,
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async create({query, page}: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.findMany(query, page);
    return {gyms};
  }
}
