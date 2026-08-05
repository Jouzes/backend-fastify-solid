import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env/env.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./routes/users.routes.js";
import { gymsRoutes } from "./routes/gyms.routes.js";
import { checkInsRoutes } from "./routes/checkIns.routes.js";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

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
