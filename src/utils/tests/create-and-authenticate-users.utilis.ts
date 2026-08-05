import type { FastifyInstance } from "fastify";
import request from "supertest";


export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "cadastro teste auto",
    email: "teste@auto.com.br",
    password: "123456"
  });
    
  const auth = await request(app.server).post("/sessions").send({
    email: "teste@auto.com.br",
    password: "123456"
  });
    
  const {token} = auth.body;
  return {token};
}