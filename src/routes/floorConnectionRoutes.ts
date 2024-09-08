import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getFloorsConnections, getFloorsConnection, addFloorsConnection, updateFloorsConnection, deleteFloorsConnection } from '../controllers/floorConnectionController';

const floorConnectionRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getFloorsConnections(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getFloorsConnection(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addFloorsConnection(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateFloorsConnection(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteFloorsConnection(server, request, reply);
  });
};

export default floorConnectionRoutes;