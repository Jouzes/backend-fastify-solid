import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetrics } from "../../factories/make-get-user-metrics.factories.js";

export async function checkInMetricsHttp(req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsService = makeGetUserMetrics();

  const {checkInsCount} = await getUserMetricsService.create({
    userId: req.user.sub
  });

  return res.status(200).send({checkInsCount});
}
