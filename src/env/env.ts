import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error(_env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
