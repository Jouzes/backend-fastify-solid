import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeRegisterGyms } from "../../factories/make-register-gym.factories.js";

export async function registerGym(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable().default(null),
    phone: z.string().nullable().default(null),
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  });

  const {title, description, phone, latitude, longitude} = registerBodySchema.parse(req.body);
  const registerGym = makeRegisterGyms();

  await registerGym.create({title, description, phone, latitude, longitude});

  return res.status(201).send();
}
