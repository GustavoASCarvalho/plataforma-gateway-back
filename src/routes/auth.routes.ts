import { z } from 'zod'
import { UserController } from '../controllers/user.controller'
import { FastifyTypedInstance } from '../types/fastify'

export async function authRoutes(fastify: FastifyTypedInstance) {
  const userController = new UserController()
  fastify.route({
    method: 'POST',
    url: '/create',
    handler: userController.create,
    schema: {
      tags: ['Auth'],
      description: 'Create a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
      })
    }
  })

  fastify.route({
    method: 'POST',
    url: '/authenticate',
    handler: userController.authenticate,
    schema: {
      tags: ['Auth'],
      description: 'Authenticate a user',
      body: z.object({
        email: z.string().email(),
        password: z.string().min(8)
      })
    }
  })
}
