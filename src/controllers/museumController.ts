import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Museum } from '../entities/museums';
import { Image } from '../entities/images';

export const getMuseums = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const museums = await server.orm.getRepository(Museum).find({ relations: ['ar_icon', 'logo', 'backgroundimage'] });
  if (!museums) {
    return reply.status(404).send({ message: 'No Museums found' });
  }
  reply.send(museums);
};

export const addMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { name, latitude, longitude, address, website, geolocked, ar_iconId, logoId, backgroundimageId, arl_file } = request.body as 
  { name: string; latitude: number; longitude: number; address: string; website: string; geolocked: boolean; ar_iconId: number; logoId: number; backgroundimageId: number; arl_file: string };

  const ar_icon = await server.orm.getRepository(Image).findOne({ where: { id: ar_iconId } });
  const logo = await server.orm.getRepository(Image).findOne({ where: { id: logoId } });
  const backgroundimage = await server.orm.getRepository(Image).findOne({ where: { id: backgroundimageId } });

  if (!ar_icon || !logo || !backgroundimage) {
    return reply.status(404).send({ message: 'Provided images attributes not found' });
  }

  const museum: Museum = server.orm.getRepository(Museum).create(
    { name, latitude, longitude, address, website, geolocked, ar_icon, logo, backgroundimage, arl_file });
  const savedMuseum = await server.orm.getRepository(Museum).save(museum);
  reply.send(savedMuseum);
};

export const updateMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, latitude, longitude, address, website, geolocked, ar_iconId, logoId, backgroundimageId, arl_file } = request.body as 
  { name: string; latitude: number; longitude: number; address: string; website: string; geolocked: boolean; ar_iconId: number; logoId: number; backgroundimageId: number; arl_file: string };

  const museumRepository = server.orm.getRepository(Museum);
  const museum = await museumRepository.findOne({ where: { id } });

  if (!museum) {
    return reply.status(404).send({ message: 'Museum not found' });
  } else {
    const ar_icon = await server.orm.getRepository(Image).findOne({ where: { id: ar_iconId } });
    const logo = await server.orm.getRepository(Image).findOne({ where: { id: logoId } });
    const backgroundimage = await server.orm.getRepository(Image).findOne({ where: { id: backgroundimageId } });

    if (!ar_icon || !logo || !backgroundimage) {
      return reply.status(404).send({ message: 'Provided images attributes not found' });
    }

    museumRepository.merge(museum, { name, latitude, longitude, address, website, geolocked, ar_icon, logo, backgroundimage, arl_file });
    const updatedMuseum = await museumRepository.save(museum);
    reply.send(updatedMuseum);
  }
};

export const deleteMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Museum).delete(id);

  if (result.affected) {
    reply.send({ message: 'Museum deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Museum not found' });
  }
};

export const getMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const museum = await server.orm.getRepository(Museum).findOne({ where: { id }, relations: ['ar_icon', 'logo', 'backgroundimage'] });

  if (museum) {
    reply.send(museum);
  } else {
    reply.status(404).send({ message: 'Museum not found' });
  }
};