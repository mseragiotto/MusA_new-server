import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Artwork } from '../entities/artworks';
import { Museum } from '../entities/museums';
import { Author } from '../entities/authors';
import { Floor } from '../entities/floors';
import { Image } from '../entities/images';

export const getArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const artworks = await server.orm.getRepository(Artwork).find(
    { relations: 
      ['author', 'museum', 'main_image', 'thumbnail', 'macroareas_image', 'floor'] });
  if (!artworks) {
    return reply.status(404).send({ message: 'No Artworks found' });
  }
  reply.send(artworks);
};

export const addArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  
  const { authorId, museumId, main_imageId, thumbnailId, macroareas_imageId, floorId, name, width, threedimensionalmodel, published } = request.body as
    { authorId: number; 
      museumId: number; 
      main_imageId: number; 
      thumbnailId: number; 
      macroareas_imageId: number; 
      floorId: number; 
      name: string; 
      width: number; 
      threedimensionalmodel: string; 
      published: boolean };

  const author = await server.orm.getRepository(Author).findOne({ where: { id: authorId } });
  const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
  const main_image = await server.orm.getRepository(Image).findOne({ where: { id: main_imageId } });
  const thumbnail = await server.orm.getRepository(Image).findOne({ where: { id: thumbnailId } });
  const macroareas_image = await server.orm.getRepository(Image).findOne({ where: { id: macroareas_imageId } });
  const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });

  if (!author || !museum || !main_image || !thumbnail || !macroareas_image || !floor) {
    return reply.status(404).send({ message: 'Author, Museum, Image, Floor or Artwork not found' });
  }
  
  const artwork: Artwork = server.orm.getRepository(Artwork).create({ author, museum, main_image, thumbnail, macroareas_image, floor, name, width, threedimensionalmodel, published }); 
  const savedArtwork = await server.orm.getRepository(Artwork).save(artwork);
  reply.send(savedArtwork);
};

export const updateArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { authorId, museumId, main_imageId, thumbnailId, macroareas_imageId, floorId, name, width, threedimensionalmodel, published } = request.body as
    { authorId: number; 
      museumId: number; 
      main_imageId: number; 
      thumbnailId: number; 
      macroareas_imageId: number; 
      floorId: number; 
      name: string; 
      width: number; 
      threedimensionalmodel: string; 
      published: boolean };

  const artworkRepository = server.orm.getRepository(Artwork);
  const artwork = await artworkRepository.findOne({ where: { id } });

  if (!artwork) {
    return reply.status(404).send({ message: 'Artwork not found' });
  } else {
    const author = await server.orm.getRepository(Author).findOne({ where: { id: authorId } });
    const museum = await server.orm.getRepository(Museum).findOne({ where: { id: museumId } });
    const main_image = await server.orm.getRepository(Image).findOne({ where: { id: main_imageId } });
    const thumbnail = await server.orm.getRepository(Image).findOne({ where: { id: thumbnailId } });
    const macroareas_image = await server.orm.getRepository(Image).findOne({ where: { id: macroareas_imageId } });
    const floor = await server.orm.getRepository(Floor).findOne({ where: { id: floorId } });

    if (!author || !museum || !main_image || !thumbnail || !macroareas_image || !floor) {
      return reply.status(404).send({ message: 'Author, Museum, Image, Floor or Artwork not found' });
    }

    artworkRepository.merge(artwork, { author, museum, main_image, thumbnail, macroareas_image, floor, name, width, threedimensionalmodel, published });
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
  const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id }, relations: ['author', 'museum', 'main_image', 'thumbnail', 'macroareas_image', 'floor'] });
  
  if (artwork) {
    reply.send(artwork);
  } else {
    reply.status(404).send({ message: 'Artwork not found' });
  }
};