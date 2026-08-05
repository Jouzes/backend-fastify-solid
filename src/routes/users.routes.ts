import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt.js";
import { registerUserHttp } from "../controllers/user/register-user.controller.js";
import { authenticateUserHttp } from "../controllers/user/authenticate-user.controller.js";
import { profileUserHttp } from "../controllers/user/profile-user.controller.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerUserHttp);
  app.post("/sessions", authenticateUserHttp);
  app.patch("/token/refresh", refreshTokenUserHttp);

  app.get("/me", {onRequest: [verifyJWT]}, profileUserHttp);
}