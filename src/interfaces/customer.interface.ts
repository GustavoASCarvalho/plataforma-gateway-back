import { Customer } from '@prisma/client'

export interface CustomerRepository {
  create({
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
    extraInfo
  }: Customer): Promise<Customer>
  update(data: Customer): Promise<Customer>
}
