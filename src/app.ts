import fastify from "fastify";
import { appRoutes } from "./routes/app.routes.js";
import { ZodError } from "zod";
import { env } from "./env/env.js";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error ,req, res) => {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //deveria ter um log aq
  }

  if (error instanceof ZodError) {
    return res.status(400).send({message: "Validation Error.", issues: error.format()});
  }
  return res.status(500).send({message: "Internal server error"});
});
