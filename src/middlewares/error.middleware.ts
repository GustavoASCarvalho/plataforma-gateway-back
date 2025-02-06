import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ApiError } from '../types/api-error.types'
import { ApiResponse } from '../types/api-response.types'

export async function errorMiddleware(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`---- error message ----`)
    console.log(error.message)
    console.log(`----  error stack  ----`)
    console.log(error.stack)
  }

  if (error instanceof ApiError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      statusCode: error.statusCode
    } as ApiResponse)
  }

  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      message: error.message,
      statusCode: 400
    } as ApiResponse)
  }
  console.log(error)
  return reply.status(500).send({
    message: 'Internal server error',
    statusCode: 500
  } as ApiResponse)
}
