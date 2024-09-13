import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRouteArtworks, getRouteArtwork, addRouteArtwork, updateRouteArtwork, deleteRouteArtwork } from '../controllers/routeArtworkController';

const routeArtworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await getRouteArtworks(server, request, reply);
  });
  server.get('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await getRouteArtwork(server, request, reply);
  });
  server.post('/', { preValidation: [server.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    await addRouteArtwork(server, request, reply);
  });
  server.put('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await updateRouteArtwork(server, request, reply);
  });
  server.delete('/:id', { preValidation: [server.authenticate] }, async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await deleteRouteArtwork(server, request, reply);
  });
};

export default routeArtworkRoutes;