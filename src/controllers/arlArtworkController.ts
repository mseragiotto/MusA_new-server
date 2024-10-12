import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ArlArtwork } from '../entities/arl_artworks';
import { Artwork } from '../entities/artworks';
import { ArlFloor } from '../entities/arl_floors';

export const getArlArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const arlArtworks = await server.orm.getRepository(ArlArtwork).find({ relations: ['artwork', 'arl_floor'] });
  if (!arlArtworks) {
    return reply.status(404).send({ message: 'No ArlArtworks found' });
  }
  reply.send(arlArtworks);
};

export const getArlArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { artworkId, arl_floorId } = request.params as { artworkId: number, arl_floorId: number };
  const arlArtwork = await server.orm.getRepository(ArlArtwork).findOne({
    where: { artwork: { id: artworkId }, arl_floor: { id: arl_floorId } }, relations: ['artwork', 'arl_floor'] });
  if (arlArtwork) {
    reply.send(arlArtwork);
  } else {
    reply.status(404).send({ message: 'ArlArtwork not found' });
  }
};

export const addArlArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { artworkId, arl_floorId, latitude, longitude, height } = request.body as
    { artworkId: number; arl_floorId: number; latitude: number; longitude: number; height: number };

  const artwork = await server.orm.getRepository(Artwork).findOneBy({ id: artworkId });
  const arl_floor = await server.orm.getRepository(ArlFloor).findOneBy({ id: arl_floorId });

  if (!artwork || !arl_floor) {
    return reply.status(404).send({ message: 'Provided Artwork or ArlFloor not found' });
  }

  const arlArtwork: ArlArtwork = server.orm.getRepository(ArlArtwork).create({ artwork, arl_floor, latitude, longitude, height });
  const savedArlArtwork = await server.orm.getRepository(ArlArtwork).save(arlArtwork);
  reply.send(savedArlArtwork);
};

export const updateArlArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { artworkId, arl_floorId } = request.params as { artworkId: number, arl_floorId: number };
  const { latitude, longitude, height } = request.body as { latitude: number; longitude: number; height: number };

  const arlArtworkRepository = server.orm.getRepository(ArlArtwork);
  const arlArtwork = await arlArtworkRepository.findOne({ where: { artwork: { id: artworkId }, arl_floor: { id: arl_floorId } } });

  if (!arlArtwork) {
    return reply.status(404).send({ message: 'ArlArtwork not found' });
  }

  arlArtworkRepository.merge(arlArtwork, { latitude, longitude, height });
  const updatedArlArtwork = await arlArtworkRepository.save(arlArtwork);
  reply.send(updatedArlArtwork);
};

export const deleteArlArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { artworkId, arl_floorId } = request.params as { artworkId: number, arl_floorId: number };
  const arlArtworkRepository = server.orm.getRepository(ArlArtwork);

  const arlArtwork = await arlArtworkRepository.findOne({
    where: { artwork: { id: artworkId }, arl_floor: { id: arl_floorId } } });

  if (!arlArtwork) {
    return reply.status(404).send({ message: 'ArlArtwork not found' });
  }

  const result = await arlArtworkRepository.delete({ artwork: { id: artworkId }, arl_floor: { id: arl_floorId } });
  if (result.affected) {
    reply.send({ message: 'ArlArtwork deleted successfully' });
  } else {
    reply.status(404).send({ message: 'ArlArtwork not found' });
  }
};