import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRouteArtworks, getRouteArtwork, addRouteArtwork, updateRouteArtwork, deleteRouteArtwork } from '../controllers/routeArtworkController';

const routeArtworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getRouteArtworks(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await getRouteArtwork(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addRouteArtwork(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await updateRouteArtwork(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
    await deleteRouteArtwork(server, request, reply);
  });
};

export default routeArtworkRoutes;