import { FastifyPluginAsync } from 'fastify';
import routes from '../routes';
import databaseRoutes from '../routes/databaseRoutes';

const management: FastifyPluginAsync = async (server) => {
    // Check server connection
    server.get('/health', async (request, reply) => {
        reply.send({ status: 'ok' });
    });


};

export default management;