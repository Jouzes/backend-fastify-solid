import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGyms } from "../../factories/make-search-gyms.factories.js";

export async function searchGymsHttp(req: FastifyRequest, res: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().int().positive().default(1)
  });
  const {query, page} = searchGymsQuerySchema.parse(req.query);
  const searchGyms = makeSearchGyms();
  const {gyms} = await searchGyms.create({query, page});

  return res.status(200).send({gyms});
}
