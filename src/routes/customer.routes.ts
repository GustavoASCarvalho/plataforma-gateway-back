import { z } from 'zod'
import { CustomerController } from '../controllers/customer.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { FastifyTypedInstance } from '../types/fastify'

export async function customerRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authMiddleware)

  const customerController = new CustomerController()

  fastify.route({
    method: 'POST',
    url: '/',
    handler: customerController.create,
    schema: {
      tags: ['Customer'],
      description: 'Create a new customer',
      body: z.object({
        name: z.string(),
        cpf: z.string().optional(),
        email: z.string().optional(),
        cellPhone: z.string().optional(),
        cep: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        address: z.string().optional(),
        number: z.string().optional(),
        neighborhood: z.string().optional(),
        extraInfo: z.string().optional()
      })
    }
  })

  fastify.route({
    method: 'GET',
    url: '/',
    handler: customerController.listAllByUserId,
    schema: {
      tags: ['Customer'],
      description: 'List all customers by user logged'
    }
  })
}
