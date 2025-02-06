import { Customer } from '@prisma/client'
import { CustomerRepository } from '../interfaces/customer.interface'
import { CustomerRepositoryPrisma } from '../repositories/customer.repository'

export interface CustomerCreate {
  name: string
  cpf: string | null
  email: string | null
  cellPhone: string | null
  cep: string | null
  city: string | null
  state: string | null
  address: string | null
  number: string | null
  neighborhood: string | null
  extraInfo: string | null
}

export class CustomerUseCase {
  private customerRepository: CustomerRepository
  constructor() {
    this.customerRepository = new CustomerRepositoryPrisma()
  }

  async create(data: CustomerCreate): Promise<Customer> {
    return await this.customerRepository.create(data)
  }

  async listAllByUserId(userId: string): Promise<Customer[]> {
    return await this.customerRepository.listAllByUserId(userId)
  }
}
