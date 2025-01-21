import 'fastify';

declare module 'fastify' {
  interface FastifyReply {
    userId?: number; // Valor personalizado
  }
}
