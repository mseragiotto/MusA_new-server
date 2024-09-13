import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArlFloors, getArlFloor, addArlFloor, updateArlFloor, deleteArlFloor } from '../controllers/arlFloorController';

const arlFloorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getArlFloors(server, request, reply);
  });
  server.get('/:floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await getArlFloor(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addArlFloor(server, request, reply);
  });
  server.put('/:floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await updateArlFloor(server, request, reply);
  });
  server.delete('/:floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
    await deleteArlFloor(server, request, reply);
  });
};

export default arlFloorRoutes;