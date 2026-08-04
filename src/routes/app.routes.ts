import type { FastifyInstance } from "fastify";
import {registerGym} from "../controllers/gym/register-gym.controller.js";
import {registerUserHttp} from "../controllers/user/register-user.controller.js";
import { authenticateUserHttp } from "../controllers/user/authenticate-user.controller.js";
import { profileUserHttp } from "../controllers/user/profile-user.controller.js";
import { createCheckInHttp } from "../controllers/check-in/create-check-in.controller.js";
import { checkInHistoryHttp } from "../controllers/check-in/check-in-history.controller.js";
import { getUserMetricsHttp } from "../controllers/check-in/get-user-metrics.controller.js";
import { validateCheckInHttp } from "../controllers/check-in/validate-check-in.controller.js";
import { locateNearbyGymsHttp } from "../controllers/gym/locate-nearby-gyms.controller.js";
import { searchGymsHttp } from "../controllers/gym/search-gyms.controller.js";
import { verifyJWT } from "../hooks/verify-jwt.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerUserHttp);
  app.post("/gyms", registerGym);
  app.post("/sessions", authenticateUserHttp);

  // Authenticated
  app.get("/me", {onRequest: [verifyJWT]}, profileUserHttp);
}