// import prisma from "../prisma";

export type ICustomer = {
  id: number;
  name: string;
  email: string;
};

let clientes: ICustomer[] = [];

class CustomerService {
  async get() {
    const customers = clientes;

    return customers;
  }

  async create({ name, email }: ICustomer) {
    const customer = {
      id: clientes.length + 1,
      name,
      email
    };

    clientes = [...clientes, customer];

    return customer;
  }

  async delete(id: number) {
    try {
      clientes = clientes.filter(customer => customer.id !== id);
    } catch (error) {
      throw new Error("Customer not found");
    }

    return { message: "Customer deleted" };
  }
}

export { CustomerService };
