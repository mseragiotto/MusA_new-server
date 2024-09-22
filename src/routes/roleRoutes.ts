import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleController';

const roleRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getRoles(server, request, reply);
  });
  server.get('/:level', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getRole(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addRole(server, request, reply);
  });
  server.put('/:level', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await updateRole(server, request, reply);
  });
  server.delete('/:level', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteRole(server, request, reply);
  });
};

export default roleRoutes;