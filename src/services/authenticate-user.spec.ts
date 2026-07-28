import { hash } from "bcryptjs";
import {beforeEach, describe, expect, it} from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository.js";
import { AuthenticateUser } from "./authenticate-user.service.js";
import { InvalidCredentialError } from "../errors/invalid-credentials.error.js";

let usersRepository: InMemoryUsersRepository;
let authenticateUser: AuthenticateUser;

describe("Authenticate user test", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUser = new AuthenticateUser(usersRepository);
  });
  
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Jon Doe",
      email: "jon@plasoft.com",
      password_hash: await hash("123456", 6)
    });

    const {user} = await authenticateUser.execute({
      email: "jon@plasoft.com",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {  
    await expect(authenticateUser.execute({
      email: "gagaga@gmail.com",
      password: "123456"
    })).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "Jon Doe",
      email: "jon@plasoft.com",
      password_hash: await hash("123456", 6)
    });

    await expect(authenticateUser.execute({
      email: "jon@plasoft.com",
      password: "incorrectPassword"
    })).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
