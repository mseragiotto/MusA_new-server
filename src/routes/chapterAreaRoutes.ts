import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getChapterAreas, getChapterArea, addChapterArea, updateChapterArea, deleteChapterArea } from '../controllers/chapterAreaController';

const chapterAreaRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getChapterAreas(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getChapterArea(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addChapterArea(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await updateChapterArea(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteChapterArea(server, request, reply);
  });
};

export default chapterAreaRoutes;