import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerService, ICustomer } from "../services/CustomerService";

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
      } as ICustomer);

      reply.send(customer);
    } catch (error) {
      throw new Error("Error creating customer");
    }
  }

  async upload(request: any, reply: FastifyReply) {
    const fileSting = request.file.buffer.toString();

    const fileLines = fileSting.split("\n");

    const customerService = new CustomerService();

    for await (const line of fileLines) {
      const [_, name, email] = line.split(",");

      if (!name || !email) {
        continue;
      }

      const hash = Math.random().toString(36).substring(7);

      customerService.create({ name, email: `${email}_${hash}` } as ICustomer);
    }

    reply.send({ message: "Customers imported successfully" });
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
