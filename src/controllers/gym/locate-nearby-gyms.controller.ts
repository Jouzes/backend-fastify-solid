import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeLocateNearbyGyms } from "../../factories/make-locate-nearby-gyms.factories.js";

export async function locateNearbyGymsHttp(req: FastifyRequest, res: FastifyReply) {
  const locateNearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  });
  const {latitude, longitude} = locateNearbyGymsQuerySchema.parse(req.query);
  const locateNearbyGyms = makeLocateNearbyGyms();
  const {gyms} = await locateNearbyGyms.create({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return res.status(200).send({gyms});
}
