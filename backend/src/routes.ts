import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { CustomerController } from "./controllers/CustomerController";
const multer = require("fastify-multer");

const multerConfig = multer();

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

  // rota de upload de csv para importação de clientes
  app.post(
    "/customer/upload",
    { preHandler: multerConfig.single("file") },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CustomerController().upload(request, reply);
    }
  );
}
