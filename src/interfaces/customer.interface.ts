import { Customer } from '@prisma/client'

export interface CustomerRepositoryCreate {
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

export interface CustomerRepository {
  create(data: CustomerRepositoryCreate): Promise<Customer>
  update(data: Customer): Promise<Customer>
  listAllByUserId(userId: string): Promise<Customer[]>
}
