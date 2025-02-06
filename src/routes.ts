import { errorMiddleware } from './middlewares/error.middleware'
import { authRoutes } from './routes/auth.routes'
import { customerRoutes } from './routes/customer.routes'
import { pixkeyRoutes } from './routes/pix-key.routes'
import { productRoutes } from './routes/product.routes'
import { userRoutes } from './routes/user.routes'
import { FastifyTypedInstance } from './types/fastify'

export async function routes(app: FastifyTypedInstance) {
  app.setErrorHandler(errorMiddleware)

  app.register(userRoutes, {
    prefix: '/user'
  })

  app.register(authRoutes, {
    prefix: '/auth'
  })

  app.register(productRoutes, {
    prefix: '/product'
  })

  app.register(pixkeyRoutes, {
    prefix: '/pix-key'
  })

  app.register(customerRoutes, {
    prefix: '/customer'
  })
}
