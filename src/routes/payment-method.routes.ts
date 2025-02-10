import { PaymentMethodController } from '../controllers/payment-method.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { FastifyTypedInstance } from '../types/fastify'

export async function paymentMethodRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authMiddleware)

  const paymentMethodController = new PaymentMethodController()

  fastify.route({
    method: 'GET',
    url: '/',
    handler: paymentMethodController.list,
    schema: {
      tags: ['Payment Method'],
      description: 'List all payment methods'
    }
  })
}
