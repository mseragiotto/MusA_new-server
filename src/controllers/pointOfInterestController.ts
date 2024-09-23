import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PointsOfInterest } from '../entities/points_of_interests';
import { DeepPartial } from 'typeorm';

export const getPointsOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointsOfInterest = await server.orm.getRepository(PointsOfInterest).find();
  reply.send(pointsOfInterest);
};

export const addPointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointOfInterest: PointsOfInterest = server.orm.getRepository(PointsOfInterest).create(request.body as DeepPartial<PointsOfInterest>);
  const savedPointOfInterest = await server.orm.getRepository(PointsOfInterest).save(pointOfInterest);
  reply.send(savedPointOfInterest);
};

export const updatePointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const pointOfInterestRepository = server.orm.getRepository(PointsOfInterest);
  const pointOfInterest = await pointOfInterestRepository.findOne({ where: { id } });

  if (!pointOfInterest) {
    reply.status(404).send({ message: 'PointOfInterest not found' });
    return;
  } else {
    pointOfInterestRepository.merge(pointOfInterest, request.body as DeepPartial<PointsOfInterest>);
    const updatedPointOfInterest = await pointOfInterestRepository.save(pointOfInterest);
    reply.send(updatedPointOfInterest);
  }
};

export const deletePointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(PointsOfInterest).delete(id);

  if (result.affected) {
    reply.send({ message: 'PointOfInterest deleted successfully' });
  } else {
    reply.status(404).send({ message: 'PointOfInterest not found' });
  }
};

export const getPointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const pointOfInterest = await server.orm.getRepository(PointsOfInterest).findOne({ where: { id } });
  reply.send(pointOfInterest);
};