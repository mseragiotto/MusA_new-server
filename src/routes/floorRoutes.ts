import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getFloor, getFloors, addFloor, updateFloor, deleteFloor } from '../controllers/floorController';

const floorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getFloors(server, request, reply);
  });
  server.get('/:floor', async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await getFloor(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addFloor(server, request, reply);
  });
  server.put('/:floor', async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await updateFloor(server, request, reply);
  });
  server.delete('/:floor', async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await deleteFloor(server, request, reply);
  });
};

export default floorRoutes;