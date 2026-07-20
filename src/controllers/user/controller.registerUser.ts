import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";

export async function registerUser (req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  });

  const {name, email, password} = registerBodySchema.parse(req.body);
  const password_hash = await hash(password, 6);

  const emailAlreadyInUse = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (emailAlreadyInUse) {
    return res.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  });
  return res.status(201).send();
}