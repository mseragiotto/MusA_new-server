import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Floor } from '../entities/floors';
import { Museum } from '../entities/museums';
import { Graph } from '../entities/graphs';
import { Image } from '../entities/images';
import { ArlFloor } from '../entities/arl_floors';

export const getFloors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const floors = await server.orm.getRepository(Floor).find({ relations: ['museum', 'image', 'graph', 'arl_floor'] });
  if (!floors) {
    return reply.status(404).send({ message: 'No Floors found' });
  } else {
    reply.send(floors);
  }
};

export const addFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { museumId, name, floor_order, latitude, longitude, rotation, width, height, main_floor, imageId, graphId, published, arl_floorId, creation_date, last_update, version } = request.body as
    { museumId: number; name: string; floor_order: number; latitude: number; longitude: number; rotation: number; width: number; height: number; main_floor: boolean; imageId: number; graphId: number; published: boolean; arl_floorId: number; creation_date: Date; last_update: Date; version: number };

  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });
  const graph = await server.orm.getRepository(Graph).findOne({ where: { id: graphId } });
  const arl_floor = await server.orm.getRepository(ArlFloor).findOne({ where: { id: arl_floorId } });

  if (!museum || !image || !graph || !arl_floor) {
    return reply.status(404).send({ message: 'Museum, Image, Graph or ArlFloor not found' });
  }

  const floor: Floor = server.orm.getRepository(Floor).create(
    { museum, name, floor_order, latitude, longitude, rotation, width, height, main_floor, image, graph, published, arl_floor, creation_date, last_update, version });
  const savedFloor = await server.orm.getRepository(Floor).save(floor);
  reply.send(savedFloor);
};

export const updateFloor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { museumId, name, floor_order, latitude, longitude, rotation, width, height, main_floor, imageId, graphId, published, arl_floorId, creation_date, last_update, version } = request.body as
    { museumId: number; name: string; floor_order: number; latitude: number; longitude: number; rotation: number; width: number; height: number; main_floor: boolean; imageId: number; graphId: number; published: boolean; arl_floorId: number; creation_date: Date; last_update: Date; version: number };

  const floorRepository = server.orm.getRepository(Floor);
  const floor = await floorRepository.findOne({ where: { id } });

  if (!floor) {
    return reply.status(404).send({ message: 'Floor not found' });
  } else {
    const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
    const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });
    const graph = await server.orm.getRepository(Graph).findOne({ where: { id: graphId } });
    const arl_floor = await server.orm.getRepository(ArlFloor).findOne({ where: { id: arl_floorId } });

    if (!museum || !image || !graph || !arl_floor) {
      return reply.status(404).send({ message: 'Museum, Image, Graph or ArlFloor not found' });
    }

    floorRepository.merge(floor, 
      { museum, name, floor_order, latitude, longitude, rotation, width, height, main_floor, image, graph, published, arl_floor, creation_date, last_update, version });
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
  const floor = await server.orm.getRepository(Floor).findOne({ where: { id }, relations: ['museum', 'image', 'graph', 'arl_floor'] });
  if (floor) {
    reply.send(floor);
  } else {
    reply.status(404).send({ message: 'Floor not found' });
  }
};