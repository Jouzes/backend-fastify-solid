import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";


export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  const user = await prisma.user.create({
    data: {
      name: "teste",
      email: "teste",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER"
    }
  });
    
  const auth = await request(app.server).post("/sessions").send({
    email: "teste@auto.com.br",
    password: "123456"
  });
    
  const {token} = auth.body;
  return {token};
} 