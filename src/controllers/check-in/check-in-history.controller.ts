import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makecheckInUserHistory } from "../../factories/make-checkIn-history.factories.js";

export async function checkInHistoryHttp(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1)
  });
  const {page} = checkInHistoryQuerySchema.parse(req.query);
  const checkInHistory = makecheckInUserHistory();
  const {checkIns} = await checkInHistory.create({userId: req.user.sub, page});

  return res.status(200).send({checkIns});
}
