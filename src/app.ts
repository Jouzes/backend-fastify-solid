import fastify from "fastify";
import { appRoutes } from "./routes/app.routes.js";

export const app = fastify();
app.register(appRoutes);
