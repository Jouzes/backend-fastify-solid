import request from "supertest";
import {app} from "../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Refresh user token e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {});

  it("should be able to refresh user token", async () => {
    await request(app.server).post("/users").send({
      name: "cadastro teste auto",
      email: "teste@auto.com.br",
      password: "123456"
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "teste@auto.com.br",
      password: "123456"
    });

    const cookies = authResponse.get("Set-Cookie")!;

    const response = await request(app.server).patch("/token/refresh").set("Cookie", cookies).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({token: expect.any(String)});
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken=")
    ]);
  });
});