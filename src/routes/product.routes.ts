import { z } from 'zod'
import { ProductController } from '../controllers/product.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { FastifyTypedInstance } from '../types/fastify'

export async function productRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authMiddleware)

  const productController = new ProductController()

  fastify.route({
    method: 'POST',
    url: '/',
    handler: productController.create,
    schema: {
      tags: ['Product'],
      description: 'Create a new product',
      body: z.object({
        name: z.string(),
        description: z.string(),
        currentPrice: z.number(),
        oldPrice: z.number(),
        paymentMethods: z.array(
          z.object({
            id: z.string()
          })
        )
      })
    }
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: productController.get,
    schema: {
      tags: ['Product'],
      description: 'Get a product by id',
      params: z.object({
        id: z.string()
      })
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    handler: productController.delete,
    schema: {
      tags: ['Product'],
      description: 'Delete a product by id',
      params: z.object({
        id: z.string()
      })
    }
  })

  fastify.route({
    method: 'GET',
    url: '/',
    handler: productController.listAllByUserId,
    schema: {
      tags: ['Product'],
      description: 'List all products by user id',
      querystring: z.object({
        page: z.number().min(0).default(0).optional(),
        take: z.number().min(1).default(10).optional()
      })
    }
  })
}
