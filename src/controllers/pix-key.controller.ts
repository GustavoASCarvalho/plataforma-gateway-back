import { FastifyRequest } from 'fastify'
import { ApiResponse } from '../types/api-response.types'
import { IFastifyReply } from '../types/fastify'
import { PixKeyUseCase } from '../usecases/pix-key.usecase'

export interface CreatePixKeyBody {
  key: string
}

export class PixKeyController {
  public async create(
    req: FastifyRequest<{
      Body: CreatePixKeyBody
    }>,
    res: IFastifyReply
  ): Promise<ApiResponse> {
    const pixKeyUseCase = new PixKeyUseCase()
    const { key } = req.body
    const pixKey = await pixKeyUseCase.create({ key, userId: res.userId! })

    return res.code(201).send({
      message: `Pix Key created successfully`,
      statusCode: 201,
      data: pixKey
    })
  }

  public async delete(
    req: FastifyRequest<{
      Params: { id: string }
    }>,
    res: IFastifyReply
  ): Promise<ApiResponse> {
    const { id } = req.params

    const pixKeyUseCase = new PixKeyUseCase()
    const pixKey = await pixKeyUseCase.delete(id)

    return res.code(200).send({
      message: 'Pix Key deleted successfully',
      statusCode: 200,
      data: pixKey
    })
  }
}
