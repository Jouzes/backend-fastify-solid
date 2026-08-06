import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUser } from "../../factories/make-checkIn-user.factories.js";

export async function createCheckInHttp(req: FastifyRequest, res: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid()
  });
  const checkInBodySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  });

  const {latitude, longitude} = checkInBodySchema.parse(req.body);
  const {gymId} = checkInParamsSchema.parse(req.params);

  const createCheckInService = makeCheckInUser();
  
  await createCheckInService.create({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });
  
  return res.status(201).send();
}
