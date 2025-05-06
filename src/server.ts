import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { routes } from './routes.js'

export function buildApp() {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifyCors, { origin: '*' })

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SnapPay API',
        version: '1.0.0',
        description: 'API for SnapPay',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        },
        contact: {
          email: 'gustavoalexandrescarvalho@gmail.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3100',
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    transform: jsonSchemaTransform
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })

  app.register(routes)

  return app
}
