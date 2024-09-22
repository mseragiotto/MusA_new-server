import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

// Check database connection
export const checkDatabaseConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  try {
    await server.orm.query('SELECT 1');
    reply.send({ status: 'Database connection check ok' });
  } catch (error) {
    reply.status(500).send({ message: 'Database connection error' });
  }
};