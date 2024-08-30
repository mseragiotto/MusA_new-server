import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArtworks, addArtwork, updateArtwork, deleteArtwork } from '../controllers/artworkController';

const artworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getArtworks(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addArtwork(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await updateArtwork(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteArtwork(server, request, reply);
  });
};

export default artworkRoutes;
