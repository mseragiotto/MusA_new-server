import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleController';

const roleRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getRoles(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await getRole(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addRole(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await updateRole(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteRole(server, request, reply);
  });
};

export default roleRoutes;