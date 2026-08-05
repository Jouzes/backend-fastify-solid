import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialError } from "../../errors/invalid-credentials.error.js";
import { makeAuthenticateUsers } from "../../factories/make-authenticate-users.factories.js";

export async function authenticateUserHttp(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6)
  });

  const {email, password} = authenticateBodySchema.parse(req.body);
  try {
    const authenticateUser = makeAuthenticateUsers();
    const {user} = await authenticateUser.execute({email, password});
    const token = await res.jwtSign({role: user.role}, {sign: {sub: user.id}});
    const refreshToken = await res.jwtSign({role: user.role}, {sign: {sub: user.id, expiresIn: "7d"}});

    return res.setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({token});
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return res.status(400).send();
    }
    throw error;
  }
}
