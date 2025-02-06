import { FastifyReply, FastifyRequest } from 'fastify'
import { ApiResponse } from '../types/api-response.types'
import { UserUseCase } from '../usecases/user.usecase'

export interface CreateUserRequestBody {
  name: string
  email: string
  password: string
  cpf?: string
  cnpj?: string
}

export interface AuthenticateUserRequestBody {
  name: string
  email: string
  password: string
  cpf?: string
  cnpj?: string
}

export class UserController {
  public async create(req: FastifyRequest, res: FastifyReply): Promise<ApiResponse> {
    const userUseCase = new UserUseCase()

    const { name, email, cpf, cnpj, password } = req.body as CreateUserRequestBody
    const token = await userUseCase.create({
      name,
      email,
      cpf,
      cnpj,
      password
    })

    return res.code(201).send({
      message: `User created successfully`,
      statusCode: 201,
      data: token
    })
  }

  public async authenticate(req: FastifyRequest, res: FastifyReply): Promise<ApiResponse> {
    const userUseCase = new UserUseCase()

    const { email, password } = req.body as AuthenticateUserRequestBody
    const token = await userUseCase.authenticate({ email, password })

    return res.code(200).send({
      message: `User authenticated successfully`,
      statusCode: 200,
      data: token
    })
  }

  public async verify(_: FastifyRequest, res: FastifyReply): Promise<ApiResponse> {
    return res.code(200).send({
      message: `User authenticated successfully`,
      statusCode: 200
    })
  }
}
