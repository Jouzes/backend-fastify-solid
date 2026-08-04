import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetrics } from "../../factories/make-get-user-metrics.factories.js";

export async function getUserMetricsHttp(req: FastifyRequest, res: FastifyReply) {
  const getUserMetrics = makeGetUserMetrics();
  const {checkInsCount} = await getUserMetrics.create({userId: req.user.sub});

  return res.status(200).send({checkInsCount});
}
