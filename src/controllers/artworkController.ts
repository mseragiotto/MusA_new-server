import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Artwork } from '../entities/artworks';
import { DeepPartial } from 'typeorm';

export const getArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const artworks = await server.orm.getRepository(Artwork).find();
  reply.send(artworks);
};

export const addArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const artwork: Artwork = server.orm.getRepository(Artwork).create(request.body as DeepPartial<Artwork>);
  const savedArtwork = await server.orm.getRepository(Artwork).save(artwork);
  reply.send(savedArtwork);
};

export const updateArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const artworkRepository = server.orm.getRepository(Artwork);
  const artwork = await artworkRepository.findOne({ where: { id } });

  if (!artwork) {
    reply.status(404).send({ message: 'Artwork not found' });
    return;
  } else {
    artworkRepository.merge(artwork, request.body as DeepPartial<Artwork>);
    const updatedArtwork = await artworkRepository.save(artwork);
    reply.send(updatedArtwork);
  }
};

export const deleteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Artwork).delete(id);

  if (result.affected) {
    reply.send({ message: 'Artwork deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Artwork not found' });
  }
};

export const getArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id } });
  reply.send(artwork);
};