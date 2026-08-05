import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";
import { prisma } from "../../lib/prisma.js";

describe("Validate check-in e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });   

  afterAll(() => {});

  it("should be able to validate a check-in", async () => {
    const {token} = await createAndAuthenticateUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "teste",
        description: "teste", 
        phone: "123",
        latitude: -27.7953242,
        longitude: -50.3020
      }
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    });

    const response = await request(app.server).patch(`/check-ins/${checkIn.id}/validate`).set("Authorization",`Bearer ${token}`).send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});