import prisma from "../prisma";

interface ICustomer {
  name: string;
  email: string;
}

class CustomerService {
  async get() {
    const customers = await prisma.customer.findMany();

    return customers;
  }

  async create({ name, email }: ICustomer) {
    const customer = await prisma.customer.create({
      data: {
        name,
        email
      }
    });

    return customer;
  }

  async delete(id: number) {
    try {
      await prisma.customer.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    return { message: "Customer deleted" };
  }
}

export { CustomerService };
