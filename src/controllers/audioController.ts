import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Audio } from '../entities/audios';
import { DeepPartial } from 'typeorm';

export const getAudios = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const audios = await server.orm.getRepository(Audio).find();
    reply.send(audios);
};

export const addAudio = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const audio = await server.orm.getRepository(Audio).save(request.body as DeepPartial<Audio>);
    reply.send(audio);
};

export const updateAudio = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const audio = await server.orm.getRepository(Audio).update(id, request.body as DeepPartial<Audio>);
    reply.send(audio);
};

export const deleteAudio = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const result = await server.orm.getRepository(Audio).delete(id);
    reply.send(result);
};
