import { Customer } from '@prisma/client';
import { prisma } from '../database/prisma-client';
import { CustomerRepository } from '../interfaces/customer.interface';

class CustomerRepositoryPrisma implements CustomerRepository {
  async create({name, cpf, email, cellPhone, cep, city, state, address, number, neighborhood, extraInfo}: Customer): Promise<Customer> {
    const result = await prisma.customer.create({
      data: {
        name,
        cpf,
        email,
        cellPhone,
        cep,
        city,
        state,
        address,
        number,
        neighborhood,
        extraInfo,
      },
    });
    return result;
  }
  async update(data: Customer): Promise<Customer> {
    const result = await prisma.customer.update({
      where: {
        id: data.id,
      },
      data: {
        ...data
      },
    });

    return result;
  }
}

export { CustomerRepositoryPrisma };

