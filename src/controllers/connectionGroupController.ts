import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ConnectionGroup } from '../entities/connection_groups';
import { Museum } from '../entities/museums';

export const getConnectionGroups = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const connectionGroups = await server.orm.getRepository(ConnectionGroup).find({ relations: ['museum'] });
  if (!connectionGroups) {
    return reply.status(404).send({ message: 'No ConnectionGroups found' });
  }
  reply.send(connectionGroups);
};

export const addConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { museumId, name, type } = request.body as { museumId: number; name: string; type: string };

  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  if (!museum) {
    return reply.status(404).send({ message: 'provided Museum id not found' });
  }

  const connectionGroup: ConnectionGroup = server.orm.getRepository(ConnectionGroup).create({ name, type, museum });
  const savedConnectionGroup = await server.orm.getRepository(ConnectionGroup).save(connectionGroup);
  reply.send(savedConnectionGroup);
};

export const updateConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { museumId, name, type } = request.body as { museumId: number; name: string; type: string };

  const connectionGroupRepository = server.orm.getRepository(ConnectionGroup);
  const connectionGroup = await connectionGroupRepository.findOne({ where: { id } });

  if (!connectionGroup) {
    return reply.status(404).send({ message: 'ConnectionGroup not found' });
  } else {
    // If a museumId is provided, we look for the museum instance
    if (museumId) {
      const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
      if (!museum) {
        return reply.status(404).send({ message: 'provided Museum id not found' });
      }
      // Assign the found Museum object to the ConnectionGroup
      connectionGroup.museum = museum;
    }
    // Merge the new data (except museumId) with the existing one
    connectionGroupRepository.merge(connectionGroup, { name, type });
    const updatedConnectionGroup = await connectionGroupRepository.save(connectionGroup);
    reply.send(updatedConnectionGroup);
  }
};

export const deleteConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(ConnectionGroup).delete(id);

  if (result.affected) {
    reply.send({ message: 'ConnectionGroup deleted successfully' });
  } else {
    reply.status(404).send({ message: 'ConnectionGroup not found' });
  }
};

export const getConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const connectionGroup = await server.orm.getRepository(ConnectionGroup).findOne({ where: { id }, relations: ['museum'] });
  if (!connectionGroup) {
    return reply.status(404).send({ message: 'ConnectionGroup not found' });
  } else {
    reply.send(connectionGroup);
  }
};