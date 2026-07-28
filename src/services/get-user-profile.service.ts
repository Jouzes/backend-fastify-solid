import { compare } from "bcryptjs";
import { InvalidCredentialError } from "../errors/invalid-credentials.error.js";
import type { UsersRepository } from "../repositories/users.repository.js";
import type { User } from "../../prisma/generated/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({userId}: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user  = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {user};
  }
}