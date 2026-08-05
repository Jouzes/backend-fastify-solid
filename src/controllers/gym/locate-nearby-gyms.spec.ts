import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";

describe("Locate nearby gyms e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to locate nearby gyms", async () => {
    const {token} = await createAndAuthenticateUser(app);

    await request(app.server).post("/gyms").set("Authorization",`Bearer ${token}`).send({
      title: "longe",
      description: "teste",
      phone: "123",
      latitude: -27.3,
      longitude: -49.7,
    });

    await request(app.server).post("/gyms").set("Authorization",`Bearer ${token}`).send({
      title: "perto",
      description: "asdasddas",
      phone: "1221",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const response = await request(app.server).get("/gyms/nearby").query({latitude: -27.2092052, longitude: -49.6401091}).set("Authorization",`Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([expect.objectContaining({
      title: "teste"
    })]);
  });
});