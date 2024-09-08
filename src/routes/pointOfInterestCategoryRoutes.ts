import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getPointOfInterestCategories, getPointOfInterestCategory, addPointOfInterestCategory, updatePointOfInterestCategory, deletePointOfInterestCategory } from '../controllers/pointOfInterestCategoryController';

const pointOfInterestCategoryRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getPointOfInterestCategories(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getPointOfInterestCategory(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addPointOfInterestCategory(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updatePointOfInterestCategory(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deletePointOfInterestCategory(server, request, reply);
  });
};

export default pointOfInterestCategoryRoutes;