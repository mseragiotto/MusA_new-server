import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Macroarea } from '../entities/macroareas';
import { DeepPartial } from 'typeorm';

export const getMacroareas = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const macroareas = await server.orm.getRepository(Macroarea).find();
  reply.send(macroareas);
};

export const addMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const macroarea = await server.orm.getRepository(Macroarea).save(request.body as DeepPartial<Macroarea>);
  reply.send(macroarea);
};

export const updateMacroarea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const macroareaRepository = server.orm.getRepository(Macroarea);
  const macroarea = await macroareaRepository.findOne({ where: { id } });

  if (!macroarea) {
    reply.status(404).send({ message: 'Macroarea not found' });
    return;
  } else {
    macroareaRepository.merge(macroarea, request.body as DeepPartial<Macroarea>);
    const updatedMacroarea = await macroareaRepository.save(macroarea);
    reply.send(updatedMacroarea);
  }
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
  reply.send(macroarea);
};