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
}