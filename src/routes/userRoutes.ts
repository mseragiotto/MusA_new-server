import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getUsers(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getUser(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addUser(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateUser(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteUser(server, request, reply);
  });
};

export default userRoutes;