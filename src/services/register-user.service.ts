import { hash } from "bcryptjs";
import type { User } from "../../prisma/generated/client.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error.js";
import type { UsersRepository } from "../repositories/users.repository.js";

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserResponse {
  user: User
}

export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async create({name, email, password}: RegisterUserRequest): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6);

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);
    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.usersRepository.create({name, email, password_hash});

    return {user};
  }
}
