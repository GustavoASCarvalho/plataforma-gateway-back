import { FastifyReply, FastifyRequest } from 'fastify'
import { ApiResponse } from '../types/api-response.types'
import { IFastifyReply } from '../types/fastify'
import { ProductUseCase } from '../usecases/product.usecase'

export interface CreateProductRequestBody {
  name: string
  description: string
  currentPrice: number
  oldPrice?: number
  paymentMethods: Array<{
    id: string
  }>
}

export interface ListAllProductsByUserIdRequestBody {
  page: number
  take: number
}

export class ProductController {
  public async create(req: FastifyRequest, res: IFastifyReply): Promise<ApiResponse> {
    const productUseCase = new ProductUseCase()
    const { name, description, currentPrice, oldPrice, paymentMethods } = req.body as CreateProductRequestBody
    const product = await productUseCase.create({
      name,
      description,
      currentPrice,
      oldPrice,
      paymentMethods,
      userId: res.userId!
    })

    return res.code(201).send({
      message: `Product created successfully`,
      statusCode: 201,
      data: product
    })
  }

  public async get(
    req: FastifyRequest<{
      Params: {
        id: string
      }
    }>,
    res: FastifyReply
  ): Promise<ApiResponse> {
    const { id } = req.params

    const productUseCase = new ProductUseCase()
    const product = await productUseCase.get(id)

    return res.code(200).send({
      message: product ? 'Product found' : 'Product not found',
      statusCode: 200,
      data: product
    })
  }

  public async delete(
    req: FastifyRequest<{
      Params: { id: string }
    }>,
    res: FastifyReply
  ): Promise<ApiResponse> {
    const { id } = req.params

    const productUseCase = new ProductUseCase()
    const product = await productUseCase.delete(id)

    return res.code(200).send({
      message: product ? 'Product deleted successfully' : 'Product not found',
      statusCode: 200,
      data: product
    })
  }

  public async listAllByUserId(
    req: FastifyRequest<{
      Querystring: { page: number; take: number }
    }>,
    res: IFastifyReply
  ): Promise<ApiResponse> {
    const productUseCase = new ProductUseCase()
    const { page, take } = req.query
    const products = await productUseCase.listAllByUserId(res.userId!, page, take)

    return res.code(200).send({
      message: 'Products found',
      statusCode: 200,
      data: {
        page,
        take,
        products
      }
    })
  }
}
