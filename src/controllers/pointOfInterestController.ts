import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PointsOfInterest } from '../entities/points_of_interests';
import { PointsOfInterestCategories } from '../entities/points_of_interest_categories';
import { Floor } from '../entities/floors';

export const getPointsOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const pointsOfInterest = await server.orm.getRepository(PointsOfInterest).find({ relations: ['floor', 'category'] });
  if (!pointsOfInterest) {
    return reply.status(404).send({ message: 'No PointsOfInterest found' });
  }
  reply.send(pointsOfInterest);
};

export const addPointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { name, floorId, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude, categoryId, published } = request.body as
  { name: string; floorId: number; x_meters: number; y_meters: number; x_pixels: number; y_pixels: number; latitude: number; longitude: number; categoryId: number; published: boolean };

  const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });
  const category = await server.orm.getRepository(PointsOfInterestCategories).findOne({ where: { id: categoryId } });

  if (!floor || !category) {
    return reply.status(404).send({ message: 'Provided floor or category attributes not found' });
  }

  const pointOfInterest: PointsOfInterest = server.orm.getRepository(PointsOfInterest).create(
    { name, floor, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude, category, published });
  const savedPointOfInterest = await server.orm.getRepository(PointsOfInterest).save(pointOfInterest);
  reply.send(savedPointOfInterest);
};

export const updatePointOfInterest = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, floorId, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude, categoryId, published } = request.body as
  { name: string; floorId: number; x_meters: number; y_meters: number; x_pixels: number; y_pixels: number; latitude: number; longitude: number; categoryId: number; published: boolean };

  const pointOfInterestRepository = server.orm.getRepository(PointsOfInterest);
  const pointOfInterest = await pointOfInterestRepository.findOne({ where: { id } });

  if (!pointOfInterest) {
    return reply.status(404).send({ message: 'PointOfInterest not found' });
  } else {
    const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });
    const category = await server.orm.getRepository(PointsOfInterestCategories).findOne({ where: { id: categoryId } });

    if (!floor || !category) {
      return reply.status(404).send({ message: 'Provided floor or category attributes not found' });
    }

    pointOfInterestRepository.merge(pointOfInterest,
      { name, floor, x_meters, y_meters, x_pixels, y_pixels, latitude, longitude, category, published }
    );
    const savedPointOfInterest = await pointOfInterestRepository.save(pointOfInterest);
    reply.send(savedPointOfInterest);
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
  const pointOfInterest = await server.orm.getRepository(PointsOfInterest).findOne({ where: { id }, relations: ['floor', 'category'] });
  if (!pointOfInterest) {
    return reply.status(404).send({ message: 'PointOfInterest not found' });
  }
  reply.send(pointOfInterest);
};