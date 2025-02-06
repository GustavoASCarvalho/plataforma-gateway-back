import { Customer } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { CustomerRepository, CustomerRepositoryCreate } from '../interfaces/customer.interface'

class CustomerRepositoryPrisma implements CustomerRepository {
  async create(data: CustomerRepositoryCreate): Promise<Customer> {
    const result = await prisma.customer.create({
      data: data
    })
    return result
  }
  async update(data: Customer): Promise<Customer> {
    const result = await prisma.customer.update({
      where: {
        id: data.id
      },
      data: {
        ...data
      }
    })

    return result
  }

  async listAllByUserId(userId: string): Promise<Customer[]> {
    const result = await prisma.customer.findMany({
      where: {
        orders: {
          some: {
            userId
          }
        }
      }
    })

    return result
  }
}

export { CustomerRepositoryPrisma }
