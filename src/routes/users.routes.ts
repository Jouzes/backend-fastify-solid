import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt.js";

export async function usersRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}