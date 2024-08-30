import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Author } from '../entities/authors';
import { DeepPartial } from 'typeorm';

export const getAuthors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const result = await server.orm.getRepository(Author).find();
    reply.send(result);
};

export const addAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const author = await server.orm.getRepository(Author).save(request.body as DeepPartial<Author>);
    reply.send(author);
};

export const updateAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const author = await server.orm.getRepository(Author).update(id, request.body as DeepPartial<Author>);
    reply.send(author);
};

export const deleteAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const result = await server.orm.getRepository(Author).delete(id);
    reply.send(result);
};
