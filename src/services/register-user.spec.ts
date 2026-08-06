import { compare } from "bcryptjs";
import {beforeEach, describe, expect, it} from "vitest";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error.js";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository.js";
import { RegisterUser } from "./register-user.service.js";

let usersRepository: InMemoryUsersRepository;
let registerUser: RegisterUser;

describe("Register user test", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUser = new RegisterUser(usersRepository);
  });
  it("should hash user password", async () => {

    await registerUser.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const createdUser = usersRepository.items[0];

    expect(createdUser).toBeDefined();
    expect(await compare("123456", createdUser!.password_hash)).toBe(true);
  });

  it("should not allow registering the same email twice", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    };

    await registerUser.create(userData);

    await expect(registerUser.create(userData)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
    expect(usersRepository.items).toHaveLength(1);
  });
});
