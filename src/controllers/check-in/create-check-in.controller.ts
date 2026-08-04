import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MaxDistanceError } from "../../errors/max-distance.error.js";
import { MaxNumberCheckinsError } from "../../errors/max-number-checkins.error.js";
import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { makeCheckInUser } from "../../factories/make-checkIn-user.factories.js";

export async function createCheckInHttp(req: FastifyRequest, res: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid()
  });
  const checkInBodySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  });

  const {gymId} = checkInParamsSchema.parse(req.params);
  const {latitude, longitude} = checkInBodySchema.parse(req.body);

  try {
    const checkInUser = makeCheckInUser();
    const {checkIn} = await checkInUser.create({
      userId: req.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude
    });

    return res.status(201).send({checkIn});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({message: error.message});
    }
    if (error instanceof MaxDistanceError || error instanceof MaxNumberCheckinsError) {
      return res.status(400).send({message: error.message});
    }

    throw error;
  }
}
