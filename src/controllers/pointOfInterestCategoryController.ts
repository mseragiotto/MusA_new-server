import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PointsOfInterestCategories } from '../entities/points_of_interest_categories';
import { Museum } from '../entities/museums';
import { Image } from '../entities/images';

export const getPointOfInterestCategories = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointOfInterestCategories = await server.orm.getRepository(PointsOfInterestCategories).find({ relations: ['museum', 'image'] });
  if (!pointOfInterestCategories) {
    return reply.status(404).send({ message: 'No PointOfInterestCategories found' });
  }
  reply.send(pointOfInterestCategories);
};

export const addPointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { name, museumId, width_pixels, height_pixels, colour, imageId } = request.body as
  { name: string; museumId: number; width_pixels: number; height_pixels: number; colour: string; imageId: number };

  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });

  if (!museum || !image) {
    return reply.status(404).send({ message: 'Provided museum or image attributes not found' });
  }

  const pointOfInterestCategory: PointsOfInterestCategories = server.orm.getRepository(PointsOfInterestCategories).create(
    { name, museum, width_pixels, height_pixels, colour, image });
  const savedPointOfInterestCategory = await server.orm.getRepository(PointsOfInterestCategories).save(pointOfInterestCategory);
  reply.send(savedPointOfInterestCategory);
};

export const updatePointOfInterestCategory = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, museumId, width_pixels, height_pixels, colour, imageId } = request.body as
  { name: string; museumId: number; width_pixels: number; height_pixels: number; colour: string; imageId: number };

  const pointOfInterestCategoryRepository = server.orm.getRepository(PointsOfInterestCategories);
  const pointOfInterestCategory = await pointOfInterestCategoryRepository.findOne({ where: { id } });

  if (!pointOfInterestCategory) {
    return reply.status(404).send({ message: 'PointOfInterestCategory not found' });
  } else {
    const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
    const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });

    if (!museum || !image) {
      return reply.status(404).send({ message: 'Provided museum or image attributes not found' });
    }

    pointOfInterestCategoryRepository.merge(pointOfInterestCategory, { name, museum, width_pixels, height_pixels, colour, image });
    const savedPointOfInterestCategory = await pointOfInterestCategoryRepository.save(pointOfInterestCategory);
    reply.send(savedPointOfInterestCategory);
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
  const pointOfInterestCategory = await server.orm.getRepository(PointsOfInterestCategories).findOne({ where: { id }, relations: ['museum', 'image'] });
  if (!pointOfInterestCategory) {
    return reply.status(404).send({ message: 'PointOfInterestCategory not found' });
  }
  reply.send(pointOfInterestCategory);
};