import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { checkDatabaseConnection } from '../controllers/databaseController';

const databaseRoutes: FastifyPluginAsync = async (server) => {
  server.get('/musa',
    {
      schema: {
        tags: ['Database'],
        summary: 'Check Database Connection',
        description: 'Check if the server is connected to the database',
        operationId: 'databaseCheck',
        response: {
          200: {
            description: 'Database connection check',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await checkDatabaseConnection(server, request, reply);
    });
};

export default databaseRoutes;