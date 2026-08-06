import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";
import { prisma } from "../../lib/prisma.js";

describe("Check-in history e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to list the history of check-ins", async () => {
    const {token, user} = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "teste",
        description: "teste", 
        phone: "123",
        latitude: -27.7953242,
        longitude: -50.3020
      }
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        }
      ]
    });

    const response = await request(app.server).get("/check-ins/history").set("Authorization",`Bearer ${token}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([expect.objectContaining({gym_id: gym.id, user_id: user.id}), expect.objectContaining({gym_id: gym.id, user_id: user.id})]);
  });
});