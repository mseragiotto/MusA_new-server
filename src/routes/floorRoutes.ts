import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getFloor, getFloors, addFloor, updateFloor, deleteFloor } from '../controllers/floorController';

const floorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getFloors(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await getFloor(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addFloor(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await updateFloor(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await deleteFloor(server, request, reply);
  });
};

export default floorRoutes;