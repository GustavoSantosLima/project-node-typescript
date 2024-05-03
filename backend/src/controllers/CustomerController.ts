import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerService } from "../services/CustomerService";

class CustomerController {
  async get(request: FastifyRequest, reply: FastifyReply) {
    const customerService = new CustomerService();
    const customers = await customerService.get();

    reply.send(customers);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as { name: string; email: string };

      const customerService = new CustomerService();
      const customer = await customerService.create({
        name: body.name,
        email: body.email
      });

      reply.send(customer);
    } catch (error) {
      throw new Error("Error creating customer");
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };

    if (!id) {
      throw new Error("Parameters are required");
    }

    const customerService = new CustomerService();
    const customer = await customerService.delete(parseInt(id, 10));

    reply.send(customer);
  }
}

export { CustomerController };
