import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRoutes } from './routes/auth.routes';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
const app = Fastify();

dotenv.config();

app.setErrorHandler(errorMiddleware)

app.register(userRoutes, {
  prefix: '/user',
});

app.register(authRoutes, {
  prefix: '/auth',
})

app.register(productRoutes, {
  prefix: '/product',
})

app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});
