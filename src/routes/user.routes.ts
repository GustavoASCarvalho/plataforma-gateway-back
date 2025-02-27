import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { FastifyTypedInstance } from '../types/fastify'

export async function userRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authMiddleware)

  const userController = new UserController()

  fastify.route({
    method: 'GET',
    url: '/verify',
    handler: userController.verify,
    schema: {
      tags: ['User'],
      description: 'Verify if the user is authenticated'
    }
  })

  fastify.route({
    method: 'GET',
    url: '/teste',
    handler: (_, reply) => {
      reply.send('Teste')
    }
  })
}
