import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { register, login } from '../controllers/authController';

const authRoutes: FastifyPluginAsync = async (server) => {
  server.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    await register(server, request, reply);
  });
  server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    await login(server, request, reply);
  });
};

export default authRoutes;