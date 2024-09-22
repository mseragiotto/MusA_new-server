import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ConnectionGroup } from '../entities/connection_groups';
import { DeepPartial } from 'typeorm';

export const getConnectionGroups = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const connectionGroups = await server.orm.getRepository(ConnectionGroup).find();
  reply.send(connectionGroups);
};

export const addConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const connectionGroup = await server.orm.getRepository(ConnectionGroup).save(request.body as DeepPartial<ConnectionGroup>);
  reply.send(connectionGroup);
};

export const updateConnectionGroup = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const connectionGroupRepository = server.orm.getRepository(ConnectionGroup);
  const connectionGroup = await connectionGroupRepository.findOne({ where: { id } });

  if (!connectionGroup) {
    reply.status(404).send({ message: 'ConnectionGroup not found' });
    return;
  } else {
    connectionGroupRepository.merge(connectionGroup, request.body as DeepPartial<ConnectionGroup>);
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
  const connectionGroup = await server.orm.getRepository(ConnectionGroup).findOne({ where: { id } });
  reply.send(connectionGroup);
};