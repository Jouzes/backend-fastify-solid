import fastify from "fastify";
import { appRoutes } from "./routes/routes.index.js";

export const app = fastify();
app.register(appRoutes);
