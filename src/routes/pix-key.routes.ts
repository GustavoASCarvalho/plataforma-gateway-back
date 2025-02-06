import { z } from 'zod'
import { PixKeyController } from '../controllers/pix-key.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { FastifyTypedInstance } from '../types/fastify'

export async function pixkeyRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authMiddleware)

  const pixkeyController = new PixKeyController()

  fastify.route({
    method: 'POST',
    url: '/',
    handler: pixkeyController.create,
    schema: {
      tags: ['Pix Key'],
      description: 'Create a new pix key',
      body: z.object({
        key: z.string()
      })
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    handler: pixkeyController.delete,
    schema: {
      tags: ['Pix Key'],
      description: 'Delete a pix key',
      params: z.object({
        id: z.string()
      })
    }
  })
}
