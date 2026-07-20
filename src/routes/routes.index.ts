import type { FastifyInstance } from "fastify";
import {registerUser} from "../controllers/user/controller.registerUser.js";
import {registerGym} from "../controllers/gym/controller.registerGym.js";

export async function appRoutes (app: FastifyInstance) {
  app.post("/users", registerUser);
  app.post("/gyms", registerGym);
}