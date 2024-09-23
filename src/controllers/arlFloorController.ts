import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ArlFloor } from '../entities/arl_floors';
import { DeepPartial } from 'typeorm';

export const getArlFloors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const arlFloors = await server.orm.getRepository(ArlFloor).find();
  reply.send(arlFloors);
};

export const addArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const arlFloor: ArlFloor = server.orm.getRepository(ArlFloor).create(request.body as DeepPartial<ArlFloor>);
  const savedArlFloor = await server.orm.getRepository(ArlFloor).save(arlFloor);
  reply.send(savedArlFloor);
};

export const updateArlFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const arlFloorRepository = server.orm.getRepository(ArlFloor);
  const arlFloor = await arlFloorRepository.findOne({ where: { id } });

  if (!arlFloor) {
    reply.status(404).send({ message: 'ArlFloor not found' });
    return;
  } else {
    arlFloorRepository.merge(arlFloor, request.body as DeepPartial<ArlFloor>);
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
  const arlFloor = await server.orm.getRepository(ArlFloor).findOne({ where: { id } });
  reply.send(arlFloor);
};

