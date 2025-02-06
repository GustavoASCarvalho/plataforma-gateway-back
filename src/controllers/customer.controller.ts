import { FastifyRequest } from 'fastify'
import { ApiResponse } from '../types/api-response.types'
import { IFastifyReply } from '../types/fastify'
import { CustomerUseCase } from '../usecases/customer.usercase'

export interface CreateCustomerBody {
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

export class CustomerController {
  public async create(
    req: FastifyRequest<{
      Body: CreateCustomerBody
    }>,
    res: IFastifyReply
  ): Promise<ApiResponse> {
    const customerUseCase = new CustomerUseCase()
    const customer = await customerUseCase.create(req.body)

    return res.code(201).send({
      message: `Customer created successfully`,
      statusCode: 201,
      data: customer
    })
  }

  public async listAllByUserId(_: FastifyRequest, res: IFastifyReply): Promise<ApiResponse> {
    const customerUseCase = new CustomerUseCase()
    const customers = await customerUseCase.listAllByUserId(res.userId!)

    return res.code(200).send({
      message: 'Customers listed successfully',
      statusCode: 200,
      data: customers
    })
  }
}
