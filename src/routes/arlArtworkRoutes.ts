import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArlArtworks, getArlArtwork, addArlArtwork, updateArlArtwork, deleteArlArtwork } from '../controllers/arlArtworkController';

const arlArtworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getArlArtworks(server, request, reply);
  });
  server.get('/:artwork/:arl_floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
    await getArlArtwork(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addArlArtwork(server, request, reply);
  });
  server.put('/:artwork/:arl_floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
    await updateArlArtwork(server, request, reply);
  });
  server.delete('/:artwork/:arl_floor', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
    await deleteArlArtwork(server, request, reply);
  });
};

export default arlArtworkRoutes;