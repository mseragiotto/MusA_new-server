import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ArlFloor } from '../entities/arl_floors';
import { Floor } from '../entities/floors';
import { Museum } from '../entities/museums';

export const getArlFloors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const arlFloors = await server.orm.getRepository(ArlFloor).find({ relations: ['museum', 'floor'] });
  if (!arlFloors) {
    return reply.status(404).send({ message: 'No ArlFloors found' });
  }
  reply.send(arlFloors);
};

export const addArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { museumId, floorId, name } = request.body as { museumId: number; floorId: number; name: string };

  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });

  if (!museum || !floor) {
    return reply.status(404).send({ message: 'Museum or Floor not found' });
  }

  const arlFloor: ArlFloor = server.orm.getRepository(ArlFloor).create({ museum, floor, name });
  const savedArlFloor = await server.orm.getRepository(ArlFloor).save(arlFloor);
  reply.send(savedArlFloor);
};

export const updateArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { museumId, floorId, name } = request.body as { museumId: number; floorId: number; name: string };

  const arlFloorRepository = server.orm.getRepository(ArlFloor);
  const arlFloor = await arlFloorRepository.findOne({ where: { id } });

  if (!arlFloor) {
    reply.status(404).send({ message: 'ArlFloor not found' });
    return;
  } else {
    if (museumId && floorId) {
      const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
      const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });
      if (!museum || !floor) {
        return reply.status(404).send({ message: 'Museum or Floor not found' });
      }
      arlFloor.museum = museum;
      arlFloor.floor = floor;
    }
    arlFloorRepository.merge(arlFloor, { name });
    const updatedArlFloor = await arlFloorRepository.save(arlFloor);
    reply.send(updatedArlFloor);
  }
};

export const deleteArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(ArlFloor).delete(id);

  if (result.affected) {
    reply.send({ message: 'ArlFloor deleted successfully' });
  } else {
    reply.status(404).send({ message: 'ArlFloor not found' });
  }
};

export const getArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const arlFloor = await server.orm.getRepository(ArlFloor).findOne({ where: { id }, relations: ['museum', 'floor'] });
  
  if (arlFloor) {
    reply.send(arlFloor);
  } else {
    reply.status(404).send({ message: 'ArlFloor not found' });
  }
};

