import { Customer } from '@prisma/client'
import { CustomerService } from '../api/asaas/customer.service'
import { CustomerRepository } from '../interfaces/customer.interface'
import { CustomerRepositoryPrisma } from '../repositories/customer.repository'

export interface CustomerCreate {
  name: string
  cpf: string
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
  private customerService: CustomerService
  constructor() {
    this.customerRepository = new CustomerRepositoryPrisma()
    this.customerService = new CustomerService()
  }

  async create(data: CustomerCreate): Promise<Customer> {
    const customerFinded = await this.customerRepository.findByCpf(data.cpf)
    let externalId = null

    if (customerFinded) {
      externalId = await this.customerService.update(customerFinded.externalId!, {
        name: data.name,
        cpfCnpj: data.cpf,
        email: data.email,
        phone: data.cellPhone,
        postalCode: data.cep,
        address: data.address,
        addressNumber: data.number,
        complement: data.extraInfo,
        province: data.state
      })
    } else {
      externalId = await this.customerService.create({
        name: data.name,
        cpfCnpj: data.cpf,
        email: data.email,
        phone: data.cellPhone,
        postalCode: data.cep,
        address: data.address,
        addressNumber: data.number,
        complement: data.extraInfo,
        province: data.state
      })
    }

    if (!externalId) throw new Error('Error creating customer')

    const customer = await this.customerRepository.create({
      ...data,
      externalId
    })

    return customer
  }

  async listAllByUserId(userId: string): Promise<Customer[]> {
    return await this.customerRepository.listAllByUserId(userId)
  }
}
