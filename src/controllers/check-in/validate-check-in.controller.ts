import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUsers } from "../../factories/make-validate-checkIn.factories.js";

export async function validateCheckInHttp(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInSchema = z.object({
    checkInId: z.string().uuid()
  });

  const {checkInId} = validateCheckInSchema.parse(req.params);

  const validateCheckInService = makeValidateCheckInUsers();
  
  await validateCheckInService.create({
    checkInId
  });
  
  return res.status(204).send();
}
