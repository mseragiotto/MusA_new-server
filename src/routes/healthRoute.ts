import { FastifyPluginAsync } from 'fastify';

const healthRoute: FastifyPluginAsync = async (server) => {
    // Check server connection
    server.get('/', async (request, reply) => {
        reply.send({ status: 'Server health check ok' });
    });


};

export default healthRoute;