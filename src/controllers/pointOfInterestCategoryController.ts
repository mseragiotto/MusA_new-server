import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PointsOfInterestCategories } from '../entities/points_of_interest_categories';
import { DeepPartial } from 'typeorm';

export const getPointOfInterestCategories = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointOfInterestCategories = await server.orm.getRepository(PointsOfInterestCategories).find();
  reply.send(pointOfInterestCategories);
};

export const addPointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointOfInterestCategory = await server.orm.getRepository(PointsOfInterestCategories).save(request.body as DeepPartial<PointsOfInterestCategories>);
  reply.send(pointOfInterestCategory);
};

export const updatePointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const pointOfInterestCategoryRepository = server.orm.getRepository(PointsOfInterestCategories);
  const pointOfInterestCategory = await pointOfInterestCategoryRepository.findOne({ where: { id } });

  if (!pointOfInterestCategory) {
    reply.status(404).send({ message: 'PointOfInterestCategory not found' });
    return;
  } else {
    pointOfInterestCategoryRepository.merge(pointOfInterestCategory, request.body as DeepPartial<PointsOfInterestCategories>);
    const updatedPointOfInterestCategory = await pointOfInterestCategoryRepository.save(pointOfInterestCategory);
    reply.send(updatedPointOfInterestCategory);
  }
};

export const deletePointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(PointsOfInterestCategories).delete(id);

  if (result.affected) {
    reply.send({ message: 'PointOfInterestCategory deleted successfully' });
  } else {
    reply.status(404).send({ message: 'PointOfInterestCategory not found' });
  }
};

export const getPointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const pointOfInterestCategory = await server.orm.getRepository(PointsOfInterestCategories).findOne({ where: { id } });
  reply.send(pointOfInterestCategory);
};