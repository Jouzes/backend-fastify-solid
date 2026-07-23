import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../errors/user-already-exists.error.js";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository.js";
import { RegisterUser } from "../../services/register-user.service.js";

export async function registerUserHttp(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  });

  const {name, email, password} = registerBodySchema.parse(req.body);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUser = new RegisterUser(prismaUsersRepository);
    await registerUser.create({name, email, password});
    return res.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
    {
      return res.status(409).send({message: error.message});
    } else {
      throw error;
    }
  }
}
