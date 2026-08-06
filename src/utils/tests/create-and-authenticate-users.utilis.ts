import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  const email = `teste_${randomUUID()}@auto.com.br`;

  const user = await prisma.user.create({
    data: {
      name: "teste",
      email,
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER"
    }
  });
    
  const auth = await request(app.server).post("/sessions").send({
    email,
    password: "123456"
  });
    
  const {token} = auth.body;
  return {token, user};
} 