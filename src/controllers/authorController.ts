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
  const authorRepository = server.orm.getRepository(Author);
  const author = await authorRepository.findOne({ where: { id } });

  if (!author) {
    reply.status(404).send({ message: 'Author not found' });
    return;
  } else {
    authorRepository.merge(author, request.body as DeepPartial<Author>);
    const updatedAuthor = await authorRepository.save(author);
    reply.send(updatedAuthor);
  }
};

export const deleteAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Author).delete(id);

  if (result.affected) {
    reply.send({ message: 'Author deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Author not found' });
  }
};

export const getAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const author = await server.orm.getRepository(Author).findOne({ where: { id } });
  reply.send(author);
};