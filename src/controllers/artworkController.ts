import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Artwork } from '../entities/artworks';
import { DeepPartial } from 'typeorm';

export const getArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const artworks = await server.orm.getRepository(Artwork).find();
    reply.send(artworks);
};

export const addArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const artwork = await server.orm.getRepository(Artwork).save(request.body as DeepPartial<Artwork>);
    reply.send(artwork);
};

export const updateArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const artwork = await server.orm.getRepository(Artwork).update(id, request.body as DeepPartial<Artwork>);
    reply.send(artwork);
};

export const deleteArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const result = await server.orm.getRepository(Artwork).delete(id);
    reply.send(result);
};
