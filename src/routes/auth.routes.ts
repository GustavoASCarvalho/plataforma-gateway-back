import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';


export async function authRoutes(fastify: FastifyInstance) {

    const userController = new UserController();
    fastify.route({
        method: 'POST',
        url: '/create',
        handler: userController.create
    })

    fastify.route({
        method: 'POST',
        url: '/authenticate',
        handler: userController.authenticate
    })
}
