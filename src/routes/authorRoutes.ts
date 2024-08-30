import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';

const authorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getAuthors(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addAuthor(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await updateAuthor(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteAuthor(server, request, reply);
  });
};

export default authorRoutes;
