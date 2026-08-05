import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makecheckInUserHistory } from "../../factories/make-checkIn-history.factories.js";

export async function checkInHistoryHttp(req: FastifyRequest, res: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  });

  const { page } = checkInHistorySchema.parse(req.query);

  const checkInHistoryService = makecheckInUserHistory();

  const {checkIns} = await checkInHistoryService.create({
    userId: req.user.sub,
    page
  });

  return res.status(200).send({checkIns});
}
