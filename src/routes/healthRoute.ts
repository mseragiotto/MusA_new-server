import { FastifyPluginAsync } from 'fastify';

const healthRoute: FastifyPluginAsync = async (server) => {
  // Check server connection
  server.get('/',
    {
      schema: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if the server is running',
        operationId: 'healthCheck',
        response: {
          200: {
            description: 'Server health check',
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
    async (request, reply) => {
      reply.send({ status: 'Server health check ok' });
    });


};

export default healthRoute;