// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => Promise<void>;
  }
}
