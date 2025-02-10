import { FastifyRequest } from 'fastify'
import { ApiResponse } from '../types/api-response.types'
import { IFastifyReply } from '../types/fastify'
import { PaymentMethodUseCase } from '../usecases/payment-method.usecase'

export class PaymentMethodController {
  public async list(req: FastifyRequest, res: IFastifyReply): Promise<ApiResponse> {
    const paymentMethodUseCase = new PaymentMethodUseCase()
    const paymentMethod = await paymentMethodUseCase.list()

    return res.code(200).send({
      message: `Payment Methods listed successfully`,
      statusCode: 201,
      data: paymentMethod
    })
  }
}
