import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { RouteArtwork } from '../entities/route_artworks';
import { Route } from '../entities/routes';
import { Artwork } from '../entities/artworks';

export const getRouteArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const routeArtworks = await server.orm.getRepository(RouteArtwork).find({ relations: ['route', 'artwork'] });
  if (!routeArtworks) {
    return reply.status(404).send({ message: 'No RouteArtworks found' });
  }
  reply.send(routeArtworks);
};

export const addRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { routeId, artworkId, order } = request.body as { routeId: number; artworkId: number, order: number };

  const route = await server.orm.getRepository(Route).findOne({ where: { id: routeId } });
  const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id: artworkId } });

  if (!route || !artwork) {
    return reply.status(404).send({ message: 'Provided route or artwork attributes not found' });
  }

  const routeArtwork: RouteArtwork = server.orm.getRepository(RouteArtwork).create({ route, artwork, order });
  const savedRouteArtwork = await server.orm.getRepository(RouteArtwork).save(routeArtwork);
  reply.send(savedRouteArtwork);
};

export const updateRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { route_id, artworkId } = request.params as { route_id: number, artworkId: number };
  const { order } = request.body as { order: number };

  const routeArtworkRepository = server.orm.getRepository(RouteArtwork);
  const routeArtwork = await routeArtworkRepository.findOne({ where: { route: { id: route_id }, artwork: { id: artworkId } } });

  if (!routeArtwork) {
    return reply.status(404).send({ message: 'RouteArtwork not found' });
  } else {
    routeArtworkRepository.merge(routeArtwork, { order });
    const updatedRouteArtwork = await routeArtworkRepository.save(routeArtwork);
    reply.send(updatedRouteArtwork);
  }
};

export const deleteRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { route_id, artworkId } = request.params as { route_id: number, artworkId: number };
  const routeArtworkRepository = server.orm.getRepository(RouteArtwork);

  const routeArtwork = await routeArtworkRepository.findOne({ where: { route: { id: route_id }, artwork: { id: artworkId } } });
  if (!routeArtwork) {
    return reply.status(404).send({ message: 'RouteArtwork not found' });
  }

  const result = await routeArtworkRepository.delete({ route: { id: route_id }, artwork: { id: artworkId } });
  if (result.affected) {
    reply.send({ message: 'RouteArtwork deleted successfully' });
  } else {
    reply.status(404).send({ message: 'RouteArtwork not found' });
  }
};

export const getRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { route_id, artworkId } = request.params as { route_id: number, artworkId: number };
  const routeArtwork = await server.orm.getRepository(RouteArtwork).findOne({
    where: { route: { id: route_id }, artwork: { id: artworkId } }, relations: ['route', 'artwork'] });
  if (routeArtwork) {
    reply.send(routeArtwork);
  } else {
    reply.status(404).send({ message: 'RouteArtwork not found' });
  }
};