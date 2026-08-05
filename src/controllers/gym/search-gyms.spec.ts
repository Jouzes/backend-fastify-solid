import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../utils/tests/create-and-authenticate-users.utilis.js";

describe("Search gyms e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to search gyms", async () => {
    const {token} = await createAndAuthenticateUser(app, true);

    await request(app.server).post("/gyms").set("Authorization",`Bearer ${token}`).send({
      title: "teste",
      description: "teste",
      phone: "123",
      latitude: -27.7953242,
      longitude: -50.3020
    });

    await request(app.server).post("/gyms").set("Authorization",`Bearer ${token}`).send({
      title: "sei la",
      description: "asdasddas",
      phone: "1221",
      latitude: -27.7953242,
      longitude: -50.3020
    });

    const response = await request(app.server).get("/gyms/search").query({q: "teste"}).set("Authorization",`Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([expect.objectContaining({
      title: "teste"
    })]);
  });
});