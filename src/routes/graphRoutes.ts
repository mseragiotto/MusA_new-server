import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getGraphs, getGraph, addGraph, updateGraph, deleteGraph } from '../controllers/graphController';

const graphRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getGraphs(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getGraph(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addGraph(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateGraph(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteGraph(server, request, reply);
  });
};

export default graphRoutes;