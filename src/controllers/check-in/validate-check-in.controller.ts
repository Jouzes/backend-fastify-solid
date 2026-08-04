import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { LateCheckInValidationError } from "../../errors/late-checkIn-validation.error.js";
import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { makeValidateCheckInUsers } from "../../factories/make-validate-checkIn.factories.js";

export async function validateCheckInHttp(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  });
  const {checkInId} = validateCheckInParamsSchema.parse(req.params);

  try {
    const validateCheckIn = makeValidateCheckInUsers();
    const {checkIn} = await validateCheckIn.create({checkInId});

    return res.status(200).send({checkIn});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({message: error.message});
    }
    if (error instanceof LateCheckInValidationError) {
      return res.status(400).send({message: error.message});
    }

    throw error;
  }
}
