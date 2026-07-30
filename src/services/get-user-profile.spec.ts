import { hash } from "bcryptjs";
import {beforeEach, describe, expect, it} from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository.js";
import { AuthenticateUser } from "./authenticate-user.service.js";
import { InvalidCredentialError } from "../errors/invalid-credentials.error.js";
import { GetUserProfile } from "./get-user-profile.service.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";

let usersRepository: InMemoryUsersRepository;
let getUserProfile: GetUserProfile;

describe("get user profile test", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfile = new GetUserProfile(usersRepository);
  });
  
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Jon Doe",
      email: "jon@plasoft.com",
      password_hash: await hash("123456", 6)
    });

    const {user} = await getUserProfile.execute({
      userId: createdUser.id
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to get user profile with wrong id", async () => {  
    await expect(() => getUserProfile.execute({userId: "sei la n existe"}),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
