import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { checkDatabaseConnection } from '../controllers/databaseController';

const databaseRoutes: FastifyPluginAsync = async (server) => {
  server.get('/musa', async (request: FastifyRequest, reply: FastifyReply) => {
    await checkDatabaseConnection(server, request, reply);
  });
};

export default databaseRoutes;