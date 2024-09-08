import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { RouteArtwork } from '../entities/route_artworks';
import { DeepPartial } from 'typeorm';

export const getRouteArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const routeArtworks = await server.orm.getRepository(RouteArtwork).find();
    reply.send(routeArtworks);
};

export const addRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const routeArtwork = await server.orm.getRepository(RouteArtwork).save(request.body as DeepPartial<RouteArtwork>);
    reply.send(routeArtwork);
};

export const updateRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { route_id } = request.params as { route_id: number };
    const routeArtworkRepository = server.orm.getRepository(RouteArtwork);
    const routeArtwork = await routeArtworkRepository.findOne({ where: { route_id } });

    if (!routeArtwork) {
        reply.status(404).send({ message: 'RouteArtwork not found' });
        return;
    } else {
        routeArtworkRepository.merge(routeArtwork, request.body as DeepPartial<RouteArtwork>);
        const updatedRouteArtwork = await routeArtworkRepository.save(routeArtwork);
        reply.send(updatedRouteArtwork);
    }
    //const routeArtwork = await server.orm.getRepository(RouteArtwork).update(id, request.body as DeepPartial<RouteArtwork>);
    //reply.send(routeArtwork);
};

export const deleteRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { route_id } = request.params as { route_id: number };
    const result = await server.orm.getRepository(RouteArtwork).delete(route_id);

    if (result.affected) {
        reply.send({ message: 'RouteArtwork deleted successfully' });
    } else {
        reply.status(404).send({ message: 'RouteArtwork not found' });
    }
};

export const getRouteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { route_id } = request.params as { route_id: number };
    const routeArtwork = await server.orm.getRepository(RouteArtwork).findOne({ where: { route_id } });
    reply.send(routeArtwork);
};