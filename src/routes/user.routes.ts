import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', authMiddleware)
  const userController = new UserController();
  fastify.route({
    method: 'GET',
    url: '/',
    handler: userController.verify
  })
}
