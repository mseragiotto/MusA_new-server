import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArtworks, getArtwork, addArtwork, updateArtwork, deleteArtwork } from '../controllers/artworkController';

const artworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getArtworks(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getArtwork(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addArtwork(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await updateArtwork(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteArtwork(server, request, reply);
  });
};

export default artworkRoutes;
