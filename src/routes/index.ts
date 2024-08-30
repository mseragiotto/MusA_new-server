import { FastifyPluginAsync } from 'fastify';
import authorRoutes from './authorRoutes';

const routes: FastifyPluginAsync = async (server) => {
  server.register(authorRoutes, { prefix: '/authors' });
};

export default routes;