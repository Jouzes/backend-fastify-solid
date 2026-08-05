import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";

describe("Register gym e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to create gym", async () => {
    const {token} = await createAndAuthenticateUser(app);

    const response = await request(app.server).post("/gyms").set("Authorization",`Bearer ${token}`).send({
      title: "teste",
      description: "teste",
      phone: "123",
      latitude: -27.7953242,
      longitude: -50.3020
    });

    expect(response.statusCode).toEqual(201);
  });
});