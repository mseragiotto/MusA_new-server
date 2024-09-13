import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getConnectionGroups, getConnectionGroup, addConnectionGroup, updateConnectionGroup, deleteConnectionGroup } from '../controllers/connectionGroupController';

const connectionGroupRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getConnectionGroups(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getConnectionGroup(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addConnectionGroup(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateConnectionGroup(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteConnectionGroup(server, request, reply);
  });
};

export default connectionGroupRoutes;