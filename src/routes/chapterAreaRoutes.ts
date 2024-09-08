import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getChapterAreas, getChapterArea, addChapterArea, updateChapterArea, deleteChapterArea } from '../controllers/chapterAreaController';

const chapterAreaRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getChapterAreas(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await getChapterArea(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addChapterArea(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await updateChapterArea(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteChapterArea(server, request, reply);
  });
};

export default chapterAreaRoutes;