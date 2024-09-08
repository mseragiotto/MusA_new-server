import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMacroareas, getMacroarea, addMacroarea, updateMacroarea, deleteMacroarea } from '../controllers/macroareaController';

const macroareaRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getMacroareas(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getMacroarea(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addMacroarea(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateMacroarea(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteMacroarea(server, request, reply);
  });
};

export default macroareaRoutes;