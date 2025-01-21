import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import { errorMiddleware } from './middlewares/error.middleware';
import { userRoutes } from './routes/user.routes';
const app = Fastify();

dotenv.config();

app.setErrorHandler(errorMiddleware)

app.register(userRoutes, {
  prefix: '/users',
});

app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});
