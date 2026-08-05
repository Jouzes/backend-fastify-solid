import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt.js";
import { locateNearbyGymsHttp } from "../controllers/gym/locate-nearby-gyms.controller.js";
import { registerGymHttp } from "../controllers/gym/register-gym.controller.js";
import { searchGymsHttp } from "../controllers/gym/search-gyms.controller.js";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGymsHttp);
  app.get("/gyms/nearby", locateNearbyGymsHttp);
  
  app.post("/gyms", registerGymHttp);
}