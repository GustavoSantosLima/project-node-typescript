import cors from "@fastify/cors";
import fastify from "fastify";
import { routes } from "./routes";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.send(error);
});

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen(3333);
  } catch (err) {
    process.exit(1);
  }
};

start();
