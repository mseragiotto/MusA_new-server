import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Image } from '../entities/images';
import { DeepPartial } from 'typeorm';

export const getImages = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const images = await server.orm.getRepository(Image).find();
  reply.send(images);
};

export const addImage = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const image = await server.orm.getRepository(Image).save(request.body as DeepPartial<Image>);
  reply.send(image);
};

export const updateImage = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const imageRepository = server.orm.getRepository(Image);
  const image = await imageRepository.findOne({ where: { id } });

  if (!image) {
    reply.status(404).send({ message: 'Image not found' });
    return;
  } else {
    imageRepository.merge(image, request.body as DeepPartial<Image>);
    const updatedImage = await imageRepository.save(image);
    reply.send(updatedImage);
  }
};

export const deleteImage = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Image).delete(id);

  if (result.affected) {
    reply.send({ message: 'Image deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Image not found' });
  }
};

export const getImage = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const image = await server.orm.getRepository(Image).findOne({ where: { id } });
  reply.send(image);
};