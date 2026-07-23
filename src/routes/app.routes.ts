import type { FastifyInstance } from "fastify";
import {registerGym} from "../controllers/gym/register-gym.controller.js";
import {registerUserHttp} from "../controllers/user/register-user.controller.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerUserHttp);
  app.post("/gyms", registerGym);
}
