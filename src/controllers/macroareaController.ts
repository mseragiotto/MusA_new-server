import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Macroarea } from '../entities/macroareas';
import { Artwork } from '../entities/artworks';

export const getMacroareas = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const macroareas = await server.orm.getRepository(Macroarea).find();
  if (!macroareas) {
    return reply.status(404).send({ message: 'No Macroareas found' });
  }
  reply.send(macroareas);
};

export const addMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { artworkId, title, colour } = request.body as { artworkId: number, title: string; colour: string };
  const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id: artworkId } });

  if (!artwork) {
    return reply.status(404).send({ message: 'Artwork not found' });
  }
  const macroarea: Macroarea = server.orm.getRepository(Macroarea).create({ artwork, title, colour });
  const savedMacroarea = await server.orm.getRepository(Macroarea).save(macroarea);
  reply.send(savedMacroarea);
};

export const updateMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { artworkId, title, colour } = request.body as { artworkId: number, title: string; colour: string };

  const macroareaRepository = server.orm.getRepository(Macroarea);
  const macroarea = await macroareaRepository.findOne({ where: { id } });

  if (!macroarea) {
    return reply.status(404).send({ message: 'Macroarea not found' });
  } else {
    if (artworkId) {
      const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id: artworkId } });
      if (!artwork) {
        return reply.status(404).send({ message: 'provided Artwork id not found' });
      }
      macroarea.artwork = artwork;
    }
  }

  macroareaRepository.merge(macroarea, { title, colour });
  const updatedMacroarea = await macroareaRepository.save(macroarea);
  reply.send(updatedMacroarea);
};

export const deleteMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Macroarea).delete(id);

  if (result.affected) {
    reply.send({ message: 'Macroarea deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Macroarea not found' });
  }
};

export const getMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const macroarea = await server.orm.getRepository(Macroarea).findOne({ where: { id } });

  if (macroarea) {
    reply.send(macroarea);
  } else {
    reply.status(404).send({ message: 'Macroarea not found' });
  }
};