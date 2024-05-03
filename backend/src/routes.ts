import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { CustomerController } from "./controllers/CustomerController";

export async function routes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "world" };
  });

  app.get("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CustomerController().get(request, reply);
  });

  app.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CustomerController().create(request, reply);
    }
  );

  app.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CustomerController().delete(request, reply);
    }
  );
}
