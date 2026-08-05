import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGyms } from "../../factories/make-search-gyms.factories.js";

export async function searchGymsHttp(req: FastifyRequest, res: FastifyReply) {
  const searchGymsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { q, page } = searchGymsSchema.parse(req.query);

  const searchGymsRepository = makeSearchGyms();

  const {gyms} = await searchGymsRepository.create({
    query: q,
    page
  });

  return res.status(200).send({gyms});
}
