import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Register user e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to register user", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "cadastro teste auto",
        email: "teste@auto.com.br",
        password: "123456"
      });
    expect(response.statusCode).toEqual(201);
  });
});