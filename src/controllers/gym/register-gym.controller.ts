import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeRegisterGyms } from "../../factories/make-register-gym.factories.js";

export async function registerGymHttp(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const {title, description, phone, latitude, longitude} = registerBodySchema.parse(req.body);

  try {
    const registerGym = makeRegisterGyms();
    await registerGym.create({
      title,
      description,
      phone,
      latitude,
      longitude
    });
  } catch (error) {

  }

  return res.status(201).send();
}
