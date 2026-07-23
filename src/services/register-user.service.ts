import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error.js";
import type { UsersRepository } from "../repositories/users.repository.js";

interface RegisterUserSchema {
  name: string
  email: string
  password: string
}

export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async create({name, email, password}: RegisterUserSchema) {
    const password_hash = await hash(password, 6);

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);
    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsError();
    }
    await this.usersRepository.create({name, email, password_hash});
  }
}
