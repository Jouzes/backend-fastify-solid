import type { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { makeGetUsersProfile } from "../../factories/make-get-user-profile.factories.js";

export async function profileUserHttp(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = makeGetUsersProfile();

  const { user } = await getUserProfile.execute({
    userId: req.user.sub
  });
  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  });
}
