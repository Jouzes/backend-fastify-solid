import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";

describe("Load profile user e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to get user profile", async () => {
    const {token, user} = await createAndAuthenticateUser(app);

    const response = await request(app.server).get("/me").set("Authorization",`Bearer ${token}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(expect.objectContaining({
      email: user.email
    }));
  });
});