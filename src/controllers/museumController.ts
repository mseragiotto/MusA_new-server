import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Museum } from '../entities/museums';
import { DeepPartial } from 'typeorm';

export const getMuseums = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const museums = await server.orm.getRepository(Museum).find();
    reply.send(museums);
};

export const addMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const museum = await server.orm.getRepository(Museum).save(request.body as DeepPartial<Museum>);
    reply.send(museum);
};

export const updateMuseum = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const museumRepository = server.orm.getRepository(Museum);
    const museum = await museumRepository.findOne({ where: { id } });

    if (!museum) {
        reply.status(404).send({ message: 'Museum not found' });
        return;
    } else {
        museumRepository.merge(museum, request.body as DeepPartial<Museum>);
        const updatedMuseum = await museumRepository.save(museum);
        reply.send(updatedMuseum);
    }
    //const museum = await server.orm.getRepository(Museum).update(id, request.body as DeepPartial<Museum>);
    //reply.send(museum);
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
    const museum = await server.orm.getRepository(Museum).findOne({ where: { id } });
    reply.send(museum);
};