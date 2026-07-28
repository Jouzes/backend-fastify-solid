import { compare } from "bcryptjs";
import { InvalidCredentialError } from "../errors/invalid-credentials.error.js";
import type { UsersRepository } from "../repositories/users.repository.js";
import type { User } from "../../prisma/generated/client.js";

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({email, password}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialError();
    }
    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialError();
    }
    return {user};
  }
}