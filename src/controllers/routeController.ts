import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Route } from '../entities/routes';
import { Museum } from '../entities/museums';

export const getRoutes = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const routes = await server.orm.getRepository(Route).find({ relations: ['museum'] });
  if (!routes) {
    return reply.status(404).send({ message: 'No Routes found' });
  }
  reply.send(routes);
};

export const addRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { museumId, description, name } = request.body as { museumId: number; description: string; name: string };

  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  if (!museum) {
    return reply.status(404).send({ message: 'Provided Museum id not found' });
  }

  const route: Route = server.orm.getRepository(Route).create({ name, description, museum });
  const savedRoute = await server.orm.getRepository(Route).save(route);
  reply.send(savedRoute);
};

export const updateRoute = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { museumId, description, name } = request.body as { museumId: number; name: string; description: string };

  const routeRepository = server.orm.getRepository(Route);
  const route = await routeRepository.findOne({ where: { id } });

  if (!route) {
    return reply.status(404).send({ message: 'Route not found' });
  } else {
    if (museumId) {
      const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
      if (!museum) {
        return reply.status(404).send({ message: 'provided Museum id not found' });
      }
      route.museum = museum;
    }
    routeRepository.merge(route, { name, description });
    const updatedRoute = await routeRepository.save(route);
    reply.send(updatedRoute);
  }
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
  const route = await server.orm.getRepository(Route).findOne({ where: { id }, relations: ['museum'] });

  if (route) {
    reply.send(route);
  } else {
    reply.status(404).send({ message: 'Route not found' });
  }
};