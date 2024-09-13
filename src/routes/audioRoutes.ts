import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getAudios, getAudio, addAudio, updateAudio, deleteAudio } from '../controllers/audioController';

const audioRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getAudios(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getAudio(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addAudio(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateAudio(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteAudio(server, request, reply);
  });
};

export default audioRoutes;