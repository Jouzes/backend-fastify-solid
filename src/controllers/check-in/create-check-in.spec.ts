import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";
import { prisma } from "../../lib/prisma.js";

describe("Create check-in e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to create a check-in", async () => {
    const {token} = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "teste",
        description: "teste", 
        phone: "123",
        latitude: -27.7953242,
        longitude: -50.3020
      }
    });

    const response = await request(app.server).post(`/gyms/${gym.id}/check-ins`).set("Authorization",`Bearer ${token}`).send({
      latitude: -27.7953242,
      longitude: -50.3020
    });

    expect(response.statusCode).toEqual(201);
  });
});