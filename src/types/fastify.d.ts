import 'fastify';

declare module 'fastify' {
  interface FastifyReply {
    userId?: string;
  }
}
