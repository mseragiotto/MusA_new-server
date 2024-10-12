import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { FloorsConnection } from '../entities/floors_connections';
import { ConnectionGroup } from '../entities/connection_groups';
import { Floor } from '../entities/floors';

export const getFloorsConnections = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const floorsConnections = await server.orm.getRepository(FloorsConnection).find({ relations: ['connection_group', 'source_floor', 'target_floor'] });
  if (!floorsConnections) {
    return reply.status(404).send({ message: 'No FloorsConnections found' });
  }
  reply.send(floorsConnections);
};

export const addFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { connection_groupId, source_floorId, target_floorId, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude } = request.body as
    { connection_groupId: number; source_floorId: number; target_floorId: number; x_meters: number; y_meters: number; x_pixels: number; y_pixels: number; latitude: number; longitude: number };

  const connection_group = await server.orm.getRepository(ConnectionGroup).findOne({ where: { id: connection_groupId } });
  const source_floor = await server.orm.getRepository(Floor).findOne({ where: { id: source_floorId } });
  const target_floor = await server.orm.getRepository(Floor).findOne({ where: { id: target_floorId } });

  if (!connection_group || !source_floor || !target_floor) {
    return reply.status(404).send({ message: 'ConnectionGroup, SourceFloor or TargetFloor not found' });
  }

  const floorsConnection: FloorsConnection = server.orm.getRepository(FloorsConnection).create({ connection_group, source_floor, target_floor, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude });
  const savedFloorsConnection = await server.orm.getRepository(FloorsConnection).save(floorsConnection);
  reply.send(savedFloorsConnection);
};

export const updateFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { connection_groupId, source_floorId, target_floorId, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude } = request.body as
    { connection_groupId: number; source_floorId: number; target_floorId: number; x_meters: number; y_meters: number; x_pixels: number; y_pixels: number; latitude: number; longitude: number };

  const floorsConnectionRepository = server.orm.getRepository(FloorsConnection);
  const floorsConnection = await floorsConnectionRepository.findOne({ where: { id } });

  if (!floorsConnection) {
    return reply.status(404).send({ message: 'FloorsConnection not found' });
  } else {
    const connection_group = await server.orm.getRepository(ConnectionGroup).findOne({ where: { id: connection_groupId } });
    const source_floor = await server.orm.getRepository(Floor).findOne({ where: { id: source_floorId } });
    const target_floor = await server.orm.getRepository(Floor).findOne({ where: { id: target_floorId } });

    if (!connection_group || !source_floor || !target_floor) {
      return reply.status(404).send({ message: 'ConnectionGroup, SourceFloor or TargetFloor not found' });
    }

    floorsConnectionRepository.merge(floorsConnection, 
      { connection_group, source_floor, target_floor, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude });
    const updatedFloorsConnection = await floorsConnectionRepository.save(floorsConnection);
    reply.send(updatedFloorsConnection);
  }
};

export const deleteFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(FloorsConnection).delete(id);

  if (result.affected) {
    reply.send({ message: 'FloorsConnection deleted successfully' });
  } else {
    reply.status(404).send({ message: 'FloorsConnection not found' });
  }
};

export const getFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const floorsConnection = await server.orm.getRepository(FloorsConnection).findOne({ where: { id }, relations: ['connection_group', 'source_floor', 'target_floor'] });
  if (floorsConnection) {
    reply.send(floorsConnection);
  } else {
    reply.status(404).send({ message: 'FloorsConnection not found' });
  }
};