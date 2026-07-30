import type { Gym } from "../../prisma/generated/client.js";
import type { GymsRepository } from "../repositories/gyms.repository.js";

interface RegisterGymRequest {
  title: string,
  description: string | null,
  phone: string | null,
  latitude: number,
  longitude: number
}

interface RegisterGymResponse {
  gym: Gym
}

export class RegisterGym {
  constructor(private gymsRepository: GymsRepository) {}

  async create({title, description, phone, latitude, longitude}: RegisterGymRequest): Promise<RegisterGymResponse> {
    const gym = await this.gymsRepository.create({title, description, phone, latitude, longitude});
    return {gym};
  }
}
