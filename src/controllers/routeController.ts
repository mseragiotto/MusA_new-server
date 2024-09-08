import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Route } from '../entities/routes';
import { DeepPartial } from 'typeorm';

export const getRoutes = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const routes = await server.orm.getRepository(Route).find();
    reply.send(routes);
};

export const addRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const route = await server.orm.getRepository(Route).save(request.body as DeepPartial<Route>);
    reply.send(route);
};

export const updateRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const routeRepository = server.orm.getRepository(Route);
    const route = await routeRepository.findOne({ where: { id } });

    if (!route) {
        reply.status(404).send({ message: 'Route not found' });
        return;
    } else {
        routeRepository.merge(route, request.body as DeepPartial<Route>);
        const updatedRoute = await routeRepository.save(route);
        reply.send(updatedRoute);
    }
    //const route = await server.orm.getRepository(Route).update(id, request.body as DeepPartial<Route>);
    //reply.send(route);
};

export const deleteRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const result = await server.orm.getRepository(Route).delete(id);

    if (result.affected) {
        reply.send({ message: 'Route deleted successfully' });
    } else {
        reply.status(404).send({ message: 'Route not found' });
    }
};

export const getRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const route = await server.orm.getRepository(Route).findOne({ where: { id } });
    reply.send(route);
};