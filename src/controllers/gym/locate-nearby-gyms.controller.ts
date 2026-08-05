import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeLocateNearbyGyms } from "../../factories/make-locate-nearby-gyms.factories.js";

export async function locateNearbyGymsHttp(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsSchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const { latitude, longitude } = nearbyGymsSchema.parse(req.query);

  const locateNearbyGymsRepository = makeLocateNearbyGyms();

  const {gyms} = await locateNearbyGymsRepository.create({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return res.status(200).send({gyms});
}
