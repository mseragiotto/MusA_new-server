import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Floor } from '../entities/floors';
import { DeepPartial } from 'typeorm';

export const getFloors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const floors = await server.orm.getRepository(Floor).find();
  reply.send(floors);
};

export const addFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const floor: Floor = server.orm.getRepository(Floor).create(request.body as DeepPartial<Floor>);
  const savedFloor = await server.orm.getRepository(Floor).save(floor);
  reply.send(savedFloor);
};

export const updateFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const floorRepository = server.orm.getRepository(Floor);
  const floor = await floorRepository.findOne({ where: { id } });

  if (!floor) {
    reply.status(404).send({ message: 'Floor not found' });
    return;
  } else {
    floorRepository.merge(floor, request.body as DeepPartial<Floor>);
    const updatedFloor = await floorRepository.save(floor);
    reply.send(updatedFloor);
  }
};

export const deleteFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Floor).delete(id);

  if (result.affected) {
    reply.send({ message: 'Floor deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Floor not found' });
  }
};

export const getFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const floor = await server.orm.getRepository(Floor).findOne({ where: { id } });
  reply.send(floor);
};