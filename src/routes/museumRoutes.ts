import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMuseums, getMuseum, addMuseum, updateMuseum, deleteMuseum } from '../controllers/museumController';

const museumRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getMuseums(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await getMuseum(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addMuseum(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await updateMuseum(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteMuseum(server, request, reply);
  });
};

export default museumRoutes;