import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import {prisma} from "../../lib/prisma.js";

export async function registerGym (req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  });

  const {title, latitude, longitude} = registerBodySchema.parse(req.body);

  await prisma.gym.create({
    data: {
      title,
      latitude,
      longitude
    }
  });
  res.status(201).send();
}