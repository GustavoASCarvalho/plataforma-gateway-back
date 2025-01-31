import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


export async function productRoutes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', authMiddleware)
    const productController = new ProductController();
    fastify.route({
        method: 'POST',
        url: '/',
        handler: productController.create,
        schema: {
            body: {
                type: 'object',
                required: ['name', 'description', 'currentPrice', 'paymentMethods'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    currentPrice: { type: 'number' },
                    oldPrice: { type: 'number' },
                    paymentMethods: {
                        type: 'array',
                        items: { type: 'object', properties: { id: { type: 'string' } } }
                    }
                },
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: productController.get,
        schema: {
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    }
                },
                required: ["id"]
            },
        }
    })

    fastify.route({
        method: 'DELETE',
        url: '/:id',
        handler: productController.delete,
        schema: {
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    }
                },
                required: ["id"]
            },
        }
    })

    fastify.route({
        method: 'GET',
        url: '/',
        handler: productController.listAllByUserId,
        schema: {
            querystring: {
                type: "object",
                properties: {
                    page: { type: 'number', minimum: 0, default: 0 },
                    take: { type: 'number', minimum: 1, default: 10 },
                },
                additionalProperties: false
            },
        }
    })
}