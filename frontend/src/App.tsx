import { FormEvent, useEffect, useState } from "react";
import { api, apiUpload } from "./api";

type CustomerProps = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    const customers = await api("/customer").then(response => {
      return response.json();
    });

    setCustomers(customers);
  }

  async function handleImport(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      (
        formElement.elements.namedItem("file") as HTMLInputElement
      ).classList.add("input-error");
      return;
    }

    await apiUpload("/customer/upload", {
      method: "POST",
      body: formData
    }).then(response => response.json());

    formElement.reset();

    setTimeout(() => {
      getCustomers();
    }, 750);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    if (!formData.get("name")) {
      (
        formElement.elements.namedItem("name") as HTMLInputElement
      ).classList.add("input-error");
      return;
    }

    if (!formData.get("email")) {
      (
        formElement.elements.namedItem("email") as HTMLInputElement
      ).classList.add("input-error");
      return;
    }

    const name = formData.get("name");
    const email = formData.get("email");

    const customer = await api("/customer", {
      method: "POST",
      body: JSON.stringify({ name, email })
    }).then(response => response.json());

    formElement.reset();

    setCustomers(allCustomers => [...allCustomers, customer]);
  }

  async function handleDelete(id: number) {
    try {
      await api(`/customer?id=${id}`, {
        method: "DELETE"
      });

      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full min-h-screen bg-slate-900 flex justify-center px-4">
      <div className="w-full md:max-w-2xl my-10">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form id="form" className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-white">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 mb-5 rounded border-2"
            placeholder="Digite o nome do cliente"
          />

          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 mb-5 rounded border-2"
            placeholder="Digite o email do cliente"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Salvar
          </button>
        </form>

        <p className="text-white text-center">
          Ou importe clientes através de um arquivo CSV com os campos nome e
          email
        </p>

        <div>
          <form onSubmit={handleImport} className="flex flex-col my-6">
            <input
              type="file"
              name="file"
              id="file"
              accept=".csv"
              className="border p-2 mb-5 text-white rounded"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Importar
            </button>
          </form>
        </div>

        <section className="flex flex-col gap-2">
          {customers.map(customer => (
            <article
              key={customer.id}
              className="w-full bg-white p-2 rounded relative hover:scale-[1.03] duration-200"
            >
              <p>
                <strong>Nome:</strong> {customer.name}
              </p>
              <p>
                <strong>Email:</strong> {customer.email}
              </p>

              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 text-white rounded w-6 h-6 absolute right-1 top-1"
              >
                X
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
