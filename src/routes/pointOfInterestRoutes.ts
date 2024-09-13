import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getPointsOfInterest, getPointOfInterest, addPointOfInterest, updatePointOfInterest, deletePointOfInterest } from '../controllers/pointOfInterestController';

const pointOfInterestRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getPointsOfInterest(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getPointOfInterest(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addPointOfInterest(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updatePointOfInterest(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deletePointOfInterest(server, request, reply);
  });
};

export default pointOfInterestRoutes;