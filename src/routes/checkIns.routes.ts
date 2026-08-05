import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt.js";
import { createCheckInHttp } from "../controllers/check-in/create-check-in.controller.js";
import { validateCheckInHttp } from "../controllers/check-in/validate-check-in.controller.js";
import { checkInHistoryHttp } from "../controllers/check-in/check-in-history.controller.js";
import { checkInMetricsHttp } from "../controllers/check-in/get-user-metrics.controller.js";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", checkInHistoryHttp);
  app.get("/check-ins/metrics", checkInMetricsHttp);

  app.post("/gyms/:gymId/check-ins", createCheckInHttp);
  app.patch("/check-ins/:checkInId/validate", validateCheckInHttp);
}